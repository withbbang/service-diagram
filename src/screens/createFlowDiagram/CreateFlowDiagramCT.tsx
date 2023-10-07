import React, { useCallback, useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
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
import { driver } from 'driver.js';
import { app, auth, handleRandomString } from 'modules/utils';
import SelfConnectingEdge from 'components/flow/customEdges/SelfConnectingEdge';
import DiamondNode from 'components/flow/customNodes/DiamondNode';
import RectangleNode from 'components/flow/customNodes/RectangleNode';
import CreateFlowDiagramPT from './CreateFlowDiagramPT';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';
import styles from './CreateFlowDiagram.module.scss';

const userGuideYn = 'flowDiagramUserGuide'; // 로컬 스토리지에 사용자 가이드 노출 여부를 저장할 키 값
const keyForTempFlowDiagrams = 'tempFlowDiagrams'; // 로컬 스토리지에 Diagram을 일시 저장할 키값
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

const exampleNodes = [
  {
    data: { label: '상남자 김영선', editPossible: true },
    dragging: false,
    height: 40,
    id: 'node-bvyhx9800s',
    position: { x: -27.442583204721316, y: -42.78548600393444 },
    positionAbsolute: { x: -27.442583204721316, y: -42.78548600393444 },
    selected: false,
    type: 'rectangleNode',
    width: 150
  },
  {
    data: { label: '인정?', editPossible: true },
    dragging: false,
    height: 80,
    id: 'node-4fnm7ez7dsl',
    position: { x: -27.236989617902907, y: 168.76845594603947 },
    positionAbsolute: { x: -27.236989617902907, y: 168.76845594603947 },
    selected: false,
    type: 'diamondNode',
    width: 150
  },
  {
    data: { label: '가정 교육 잘 받음', editPossible: true },
    dragging: false,
    height: 40,
    id: 'node-zue9g0i8k1c',
    position: { x: -327.2120558443477, y: 389.90737382206754 },
    positionAbsolute: { x: -327.2120558443477, y: 389.90737382206754 },
    selected: false,
    type: 'rectangleNode',
    width: 150
  },
  {
    data: { label: '사형', editPossible: true },
    dragging: false,
    height: 40,
    id: 'node-ebvzjz24iqp',
    position: { x: 262.77433226782654, y: 391.25536066581407 },
    positionAbsolute: { x: 262.77433226782654, y: 391.25536066581407 },
    selected: false,
    type: 'rectangleNode',
    width: 150
  }
]; // 예시 노드들
const exampleEdges = [
  {
    id: 'reactflow__edge-node-bvyhx9800sbottom-source-node-4fnm7ez7dsltop-target',
    ...edgeOptions,
    source: 'node-bvyhx9800s',
    sourceHandle: 'bottom-source',
    target: 'node-4fnm7ez7dsl',
    targetHandle: 'top-target',
    type: 'step'
  },
  {
    id: 'reactflow__edge-node-4fnm7ez7dslleft-source-node-zue9g0i8k1ctop-target',
    label: 'Y',
    ...edgeOptions,
    selected: false,
    source: 'node-4fnm7ez7dsl',
    sourceHandle: 'left-source',
    target: 'node-zue9g0i8k1c',
    targetHandle: 'top-target',
    type: 'step'
  },
  {
    id: 'reactflow__edge-node-4fnm7ez7dslright-source-node-ebvzjz24iqptop-target',
    label: 'N',
    ...edgeOptions,
    selected: false,
    source: 'node-4fnm7ez7dsl',
    sourceHandle: 'right-source',
    target: 'node-ebvzjz24iqp',
    targetHandle: 'top-target',
    type: 'step'
  }
]; // 예시 엣지들

const CreateFlowDiagramCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeCreateFlowDiagramCT): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const type = 'flow'; // Firebase 컬렉션 이름
  const navigate = useNavigate();

  const [grade, setGrade] = useState<number | undefined>(); // 로그인 사용자 등급
  const [id, setId] = useState<string>(''); // 노드 및 엣지 포커싱을 위한 id
  const [title, setTitle] = useState<string>(''); // 다이어그램 제목
  const [nodeName, setNodeName] = useState<string>(''); // 노드 이름
  const [edgeName, setEdgeName] = useState<string>(''); // 엣지 이름
  const [isDone, setIsDone] = useState<string>('N'); // 완료 여부
  const [rfInstance, setRfInstance] = useState<any>(null); // 로컬스토리지 일시 저장용 다이어그램 인스턴스
  const { setViewport } = useReactFlow(); // 전체젹인 뷰 관련 객체
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅
  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅

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

  const [nodes, setNodes, handleNodesChange] = useNodesState(exampleNodes); // 노드 수정 hook
  const [edges, setEdges, handleEdgesChange] = useEdgesState(exampleEdges); // 엣지 수정 hook

  // 페이지 진입시 최초 유저 가이드 호출
  useEffect(() => {
    localStorage.getItem(userGuideYn) !== 'Y' && handleDrive();
  }, []);

  // 로그인 여부 판단 훅
  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      handleLoaderTrue();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docSnap = await getDoc(doc(db, 'authority', user.uid));

          if (docSnap !== undefined && docSnap.exists())
            setGrade(docSnap.data().grade);
        }

        handleLoaderFalse();
      });
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
      const id = 'node-' + handleRandomString();

      setNodes((nodes: Array<Node>) => {
        return [
          ...nodes.map((node) => ({ ...node, selected: false })),
          {
            id,
            type,
            position: { x: 0, y: 0 },
            data: { label: id, editPossible: true },
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
        setErrorMessage('Nothing Restored');
        setErrorPopupActive(true);
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

  const handleBack = () => {
    navigate(-1);
  };

  // confirm 팝업 확인 버튼
  const handleConfirm = async () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
    handleLoaderTrue();
    try {
      const { id } = await addDoc(collection(db, type), {
        title,
        content: JSON.stringify(rfInstance.toObject()),
        isDone,
        createDt: serverTimestamp(),
        updateDt: ''
      });

      navigate(`/diagram/${type}/${id}`, { replace: true });
    } catch (error) {
      console.error(error);
      setErrorMessage('Data Saving Error');
      setErrorPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

  // confirm 팝업 취소 버튼
  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  // error 팝업 확인 버튼
  const handleErrorPopup = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
  };

  // 유저 가이드 핸들러
  const handleDrive = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: 'intro',
          popover: {
            title: 'Flow Diagram 사용자 가이드',
            description: 'Flow Diagram 사용자 가이드를 시작합니다.'
          }
        },
        {
          element: `.${styles.updatenode__controls}`,
          popover: {
            title: '컨트롤 보드',
            description: 'Diagram을 제어하는 기능들이 담겨있습니다.'
          }
        },
        {
          element: `.${styles.updatenode__controls} input:nth-of-type(1)`,
          popover: {
            title: 'Title 입력',
            description: '현재 Diagram의 Title을 입력합니다.'
          }
        },
        {
          element: `.${styles.updatenode__controls} input:nth-of-type(2)`,
          popover: {
            title: 'Node 내용 입력',
            description: '원하는 Node를 더블 클릭 후 내용을 입력합니다.'
          }
        },
        {
          element: `.${styles.updatenode__controls} input:nth-of-type(3)`,
          popover: {
            title: 'Edge 내용 입력',
            description: '원하는 Edge를 더블 클릭 후 내용을 입력합니다.'
          }
        },
        {
          element: `.${styles.updatenode__controls} select`,
          popover: {
            title: 'Diagram 공개 여부',
            description: '영구 저장시, 현재 Diagram의 공개 여부를 선택합니다.'
          }
        },
        {
          element: `.${styles.updatenode__controls} button:nth-of-type(1)`,
          popover: {
            title: 'Diamond Node 생성',
            description: 'Diamond Node를 생성합니다.'
          }
        },
        {
          element: `.${styles.updatenode__controls} button:nth-of-type(2)`,
          popover: {
            title: 'Rectangle Node 생성',
            description: 'Rectangle Node를 생성합니다.'
          }
        },
        {
          element: `.${styles.updatenode__controls} button:nth-of-type(3)`,
          popover: {
            title: '일시 저장',
            description: '현재 작성한 Diagram을 일시 저장합니다.'
          }
        },
        {
          element: `.${styles.updatenode__controls} button:nth-of-type(4)`,
          popover: {
            title: '불러오기',
            description: '일시 저장한 Diagram을 불러옵니다.'
          }
        },
        {
          element: '[data-id="node-bvyhx9800s-bottom-source-source"]',
          popover: {
            title: 'Edge 연결 하는 방법 1',
            description: '원하는 Source Node의 점을 클릭 후 드래그합니다.'
          }
        },
        {
          element: '[data-id="node-4fnm7ez7dsl-top-source-source"]',
          popover: {
            title: 'Edge 연결 하는 방법 2',
            description: '원하는 Target Node의 점에 드롭합니다.',
            onNextClick: () => {
              //TODO: 다음으로 넘어가기 전에 노드 포커싱된 화면 보여주기
              driverObj.moveNext();
            }
          }
        },
        {
          element: '.CommonNodeStyles_rectangleNode__xcENp',
          popover: {
            title: 'Node 포커싱 하는 방법',
            description: '포커싱 하고 싶은 Node를 클릭합니다.',
            onNextClick: () => {
              //TODO: 다음으로 넘어가기 전에엣지 포커싱된 화면 보여주기
              driverObj.moveNext();
            }
          },
          onDeselected: () => {
            //TODO: Node 포커싱 해제
          }
        },
        {
          element: '.react-flow__edge',
          popover: {
            title: 'Edge 포커싱 하는 방법',
            description: '포커싱 하고 싶은 Edge를 클릭합니다.'
          },
          onDeselected: () => {
            //TODO: Edge 포커싱 해제
          }
        },
        {
          element: 'delete node or edge',
          popover: {
            title: 'Node 혹은 Edge 지우는 방법',
            description: 'Node 혹은 Edge를 포커싱 하고 Backspace를 누릅니다.'
          }
        }
      ],
      onDestroyStarted: () => {
        if (window.confirm('사용자 가이드를 다신 안 보시겠습니까?')) {
          localStorage.setItem(userGuideYn, 'Y');
          driverObj.destroy();
        }
      }
    });

    driverObj.drive();
  };

  return (
    <CreateFlowDiagramPT
      grade={grade}
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
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
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
      onBack={handleBack}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onInit={setRfInstance}
      onErrorPopup={handleErrorPopup}
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
