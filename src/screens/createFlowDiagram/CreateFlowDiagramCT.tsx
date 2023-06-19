import React, { useCallback, useEffect, useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from 'modules/utils';
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

const keyForTempFlowDiagrams = 'tempFlowDiagrams';
const nodeTypes = { diamondNode: DiamondNode, rectangleNode: RectangleNode };
const edgeTypes = {
  selfConnectingEdge: SelfConnectingEdge
};
const edgeOptions = {
  // animated: true,
  markerEnd: {
    type: MarkerType.Arrow,
    width: 15,
    height: 15
  }
};

const CreateFlowDiagramCT = ({
  handleLoaderTrue,
  handleLoaderFalse
}: typeCreateFlowDiagramCT): JSX.Element => {
  const db = getFirestore(app);
  const type = 'flow';

  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [nodeName, setNodeName] = useState<string>('');
  const [edgeName, setEdgeName] = useState<string>('');
  const [rfInstance, setRfInstance] = useState<any>(null);
  const { setViewport } = useReactFlow();
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  const titleNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const nodeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const edgeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;

  const [nodes, setNodes, handleNodesChange] = useNodesState([]);
  const [edges, setEdges, handleEdgesChange] = useEdgesState([]);

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
            data: { label: 'node ' + num },
            selected: true
          }
        ];
      });
    },
    [nodes, setNodes]
  );

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

  const handleEdgeDoubleClick = (e: React.MouseEvent, edge: any) => {
    setNodeName('');
    setId(edge.id);
    edge.label ? setEdgeName(edge.label) : setEdgeName('');
    edgeNameRef && edgeNameRef.current && edgeNameRef.current.focus();
    nodeNameRef && nodeNameRef.current && nodeNameRef.current.blur();
  };

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
    }
  };

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

  const handleSaveBtn = async () => {
    setConfirmMessage('Really Save?');
    setConfirmPopupActive(true);
  };

  const handleConfirm = async () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
    handleLoaderTrue();
    await addDoc(collection(db, type), {
      title,
      content: JSON.stringify(rfInstance.toObject())
    });
    handleLoaderFalse();
  };

  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  return (
    <CreateFlowDiagramPT
      title={title}
      nodeName={nodeName}
      edgeName={edgeName}
      titleNameRef={titleNameRef}
      nodeNameRef={nodeNameRef}
      edgeNameRef={edgeNameRef}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onSetTitle={setTitle}
      onSetNodeName={setNodeName}
      onSetEdgeName={setEdgeName}
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

interface typeCreateFlowDiagramCT {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}
