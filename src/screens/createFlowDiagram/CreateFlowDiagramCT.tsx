import React, { useCallback, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore';
import { app, auth } from 'modules/utils';
import {
  Connection,
  Edge,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  MarkerType,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import SelfConnectingEdge from 'components/flow/customEdges/SelfConnectingEdge';
import DiamondNode from 'components/flow/customNodes/DiamondNode';
import RectangleNode from 'components/flow/customNodes/RectangleNode';
import CreateFlowDiagramPT from './CreateFlowDiagramPT';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';

const keyForTempFlowDiagrams = 'tempFlowDiagrams'; // 로컬 스토리지에 일시 저장할 키값
const nodeTypes = { diamondNode: DiamondNode, rectangleNode: RectangleNode }; // 커스텀 노드 타입들
const edgeTypes = {
  selfConnectingEdge: SelfConnectingEdge
}; // 커스텀 엣지 타입들
const edgeOptions = {
  // animated: true,
  markerEnd: {
    type: MarkerType.Arrow,
    width: 15,
    height: 15
  }
}; // 엣지 공통 옵션

const CreateFlowDiagramCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeCreateFlowDiagramCT): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const type = 'flow'; // Firebase 컬렉션 이름

  const [uid_, setUid_] = useState<string>(''); // 로그인 여부 판단 훅
  const [id, setId] = useState<string>(''); // 노드 및 엣지 포커싱을 위한 id
  const [title, setTitle] = useState<string>(''); // 다이어그램 제목
  const [nodeName, setNodeName] = useState<string>(''); // 노드 이름
  const [edgeName, setEdgeName] = useState<string>(''); // 엣지 이름
  const [isDone, setIsDone] = useState<string>('N'); // 완료 여부
  const [rfInstance, setRfInstance] = useState<any>(null); // 로컬스토리지 일시 저장용 다이어그램 인스턴스
  const { setViewport } = useReactFlow(); // 전체젹인 뷰 관련 객체
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  // 다이어그램 제목 input 참조 객체
  const titleNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  // 노드 이름 input 참조 객체
  const nodeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  // 엣지 이름 input 참조 객체
  const edgeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  // 완료 여부 select 참조 객체
  const isDoneRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLSelectElement | null>;

  const [nodes, setNodes, handleNodesChange] = useNodesState([]); // 노드 수정 hook
  const [edges, setEdges, handleEdgesChange] = useEdgesState([]); // 엣지 수정 hook

  // 로그인 여부 판단 훅
  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      handleLoaderTrue();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid_(user.uid);
        }
        handleLoaderFalse();
      });
    } else {
      setUid_('');
    }
  }, [uid]);

  // 노드 이름 변경시 작동
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label: nodeName
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  // 엣지 이름 변경시 작동
  useEffect(() => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === id) {
          edge = {
            ...edge,
            label: edgeName
          };
        }

        return edge;
      })
    );
  }, [edgeName, setEdges]);

  // 엣지로 노드와 연결하는 순간 동작하는 메소드
  const handleConnect = useCallback(
    (params: Edge | Connection) => {
      const { source, target } = params;
      const sourcePos = params.sourceHandle?.split('-')[0];
      const targetPos = params.targetHandle?.split('-')[0];

      setEdges((edges) =>
        addEdge(
          {
            ...params,
            ...edgeOptions,
            type:
              source === target && sourcePos === targetPos
                ? 'selfConnectingEdge'
                : 'step'
          },
          edges
        )
      );
    },
    [setEdges]
  );

  // 노드 삭제시 실행되는 콜백 함수
  const handleNodesDelete = useCallback(
    (deleted: Array<Node>) => {
      setEdges(
        deleted.reduce((acc: Array<Edge>, node: Node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
              ...edgeOptions
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  // 노드 추가 콜백 함수
  const handleAddNode = useCallback(
    (type: string) => {
      const num = nodes.length;

      setNodes((nodes: Array<Node>) => {
        return [
          ...nodes.map((node) => ({ ...node, selected: false })),
          {
            id: 'node-' + num,
            type,
            position: { x: 0, y: 0 },
            data: { label: 'node ' + num, editPossible: true },
            selected: true
          }
        ];
      });
    },
    [nodes, setNodes]
  );

  // 노드 더블 클릭시 노드 이름 input 포커싱 되는 콜백 함수
  const handleNodeDoubleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    setEdgeName('');
    setId(node.id);
    setNodeName(node.data.label);
    nodeNameRef && nodeNameRef.current && nodeNameRef.current.focus();
    edgeNameRef && edgeNameRef.current && edgeNameRef.current.blur();
  };

  // 엣지 더블 클릭시 엣지 이름 input 포커싱 되는 콜백 함수
  const handleEdgeDoubleClick = (e: React.MouseEvent, edge: any) => {
    setNodeName('');
    setId(edge.id);
    edge.label ? setEdgeName(edge.label) : setEdgeName('');
    edgeNameRef && edgeNameRef.current && edgeNameRef.current.focus();
    nodeNameRef && nodeNameRef.current && nodeNameRef.current.blur();
  };

  // input 포커싱 해제 콜백 함수
  const handleBlur = (type: string) => {
    setId('');
    if (type === 'title' && titleNameRef && titleNameRef.current) {
      titleNameRef.current.blur();
    } else if (type === 'node' && nodeNameRef && nodeNameRef.current) {
      setNodeName('');
      nodeNameRef.current.blur();
    } else if (type === 'edge' && edgeNameRef && edgeNameRef.current) {
      setEdgeName('');
      edgeNameRef.current.blur();
    } else if (type === 'isDone' && isDoneRef && isDoneRef.current) {
      isDoneRef.current.blur();
    }
  };

  // input 포커싱 해제 트리거 함수
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: string
  ) => {
    switch (e.key) {
      case 'Enter':
      case 'Escape':
        handleBlur(type);
        break;
    }
  };

  /**
   * 노드랑 엣지 그리고 각 객체들이 들고 있는 정보가 많을 경우
   * 데이터를 stringify하는데 오래 걸릴 수 있으므로 async 비동기 처리로 넘긴다.
   */
  const handleTemporarilySave = useCallback(() => {
    const saveFlow = async () => {
      if (rfInstance) {
        handleLoaderTrue();
        const flow = rfInstance.toObject();
        localStorage.setItem(keyForTempFlowDiagrams, JSON.stringify(flow));
        handleLoaderFalse();
      }
    };

    saveFlow();
  }, [rfInstance]);

  /**
   * 노드랑 엣지 그리고 각 객체들이 들고 있는 정보가 많을 경우
   * 데이터를 파싱하는데 오래 걸릴 수 있으므로 async 비동기 처리로 넘긴다.
   */
  const handleRestore = useCallback(() => {
    const restoreFlow = async () => {
      const value = localStorage.getItem(keyForTempFlowDiagrams);

      if (value) {
        handleLoaderTrue();
        const flow = JSON.parse(value);

        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(
            flow.nodes.map((node: Node) => {
              const { data, width, height } = node;
              return { ...node, data: { ...data, width, height } };
            }) || []
          );
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
        handleLoaderFalse();
      } else {
        alert('Nothing Restored');
        return;
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  // 저장 버튼
  const handleSaveBtn = async () => {
    setConfirmMessage('Really Save?');
    setConfirmPopupActive(true);
  };

  // confirm 팝업 확인 버튼
  const handleConfirm = async () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
    handleLoaderTrue();
    await addDoc(collection(db, type), {
      title,
      content: JSON.stringify(rfInstance.toObject()),
      isDone,
      createDt: serverTimestamp(),
      updateDt: ''
    });
    handleLoaderFalse();
  };

  // confirm 팝업 취소 버튼
  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  return (
    <CreateFlowDiagramPT
      uid={uid}
      uid_={uid_}
      title={title}
      nodeName={nodeName}
      edgeName={edgeName}
      isDone={isDone}
      titleNameRef={titleNameRef}
      nodeNameRef={nodeNameRef}
      edgeNameRef={edgeNameRef}
      isDoneRef={isDoneRef}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onSetTitle={setTitle}
      onSetNodeName={setNodeName}
      onSetEdgeName={setEdgeName}
      onSetIsDone={setIsDone}
      onNodesDelete={handleNodesDelete}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onConnect={handleConnect}
      onNodeDoubleClick={handleNodeDoubleClick}
      onEdgeDoubleClick={handleEdgeDoubleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onAddNode={handleAddNode}
      onTemporarilySave={handleTemporarilySave}
      onRestore={handleRestore}
      onSaveBtn={handleSaveBtn}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onInit={setRfInstance}
    />
  );
};

export default (props: typeCreateFlowDiagramCT) => (
  <ReactFlowProvider>
    <CreateFlowDiagramCT {...props} />
  </ReactFlowProvider>
);

interface typeCreateFlowDiagramCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}
