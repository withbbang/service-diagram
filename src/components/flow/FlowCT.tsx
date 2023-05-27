import React, { useCallback, useEffect, useState } from 'react';
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
import DiamondNode from './customNodes/DiamondNode';
import RectangleNode from './customNodes/RectangleNode';
import SelfConnectingEdge from './customEdges/SelfConnectingEdge';
import FlowPT from './FlowPT';
import {
  CommonState,
  handleLoaderFalse
} from 'middlewares/reduxToolkits/commonSlice';

const nodeTypes = { diamondNode: DiamondNode, rectangleNode: RectangleNode };
const edgeTypes = {
  selfConnectingEdge: SelfConnectingEdge
};

const FlowCT = ({ handleLoaderTrue, handleLoaderFalse }: typeFlowCT) => {
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('Test Flow Diagram');
  const [nodeName, setNodeName] = useState<string>('');
  const [edgeName, setEdgeName] = useState<string>('');
  const [addButtonType, setAddButtonType] = useState<string>('');
  const [rfInstance, setRfInstance] = useState<any>(null);

  const { setViewport } = useReactFlow();

  const keyForTempFlowDiagrams = 'tempFlowDiagrams';

  const titleNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const nodeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const edgeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;

  const nodeHandleTargetDirections: Array<string> = [
    'none',
    'top',
    'left',
    'bottom',
    'right',
    'top-left',
    'left-bottom',
    'bottom-right',
    'right-top',
    'top-left-bottom',
    'left-bottom-right',
    'bottom-right-top',
    'right-top-left',
    'left-right',
    'top-bottom',
    'all'
  ];

  const edgeOptions = {
    type: 'step',
    markerEnd: {
      type: MarkerType.Arrow,
      width: 15,
      height: 15,
      color: '#74c3f0'
    },
    style: {
      strokeWidth: 2,
      stroke: '#74c3f0'
    }
  };

  const initialNodes: Array<Node> = [
    {
      id: 'node-0',
      type: 'diamondNode',
      position: { x: 500, y: 500 },
      data: { label: 'diamond', handleType: 'top' }
    },
    {
      id: 'node-3',
      type: 'rectangleNode',
      position: { x: 300, y: 300 },
      data: { label: '', handleType: 'top-left' }
    },
    {
      id: 'node-4',
      type: 'rectangleNode',
      position: { x: 0, y: 0 },
      data: { label: '', handleType: 'left-right' }
    },
    {
      id: 'node-1',
      type: 'output',
      position: { x: 0, y: 200 },
      data: { label: 'node 2' }
    },
    {
      id: 'node-2',
      type: 'output',
      position: { x: 200, y: 200 },
      data: { label: 'node 3' }
    }
  ];
  const initialEdges: Array<Edge> = [
    {
      id: 'edge-1',
      source: 'node-0',
      target: 'node-3',
      sourceHandle: 'c',
      ...edgeOptions
    },
    {
      id: 'edge-2',
      source: 'node-0',
      target: 'node-2',
      sourceHandle: 'b',
      ...edgeOptions
    },
    {
      id: 'edge-self',
      source: 'node-4',
      target: 'node-4',
      ...edgeOptions
    }
    // TODO: 방향마다 굽어지는 효과를 줘야함
    // {
    //   id: 'edge-self',
    //   source: 'node-4',
    //   target: 'node-4',
    //   type: 'selfConnectingEdge',
    //   markerEnd: { type: MarkerType.Arrow }
    // }
  ];

  const [nodes, setNodes, handleNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, handleEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
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
          // it's important that you create a new object here
          // in order to notify react flow about the change
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
    (params: Edge | Connection) =>
      setEdges((edges) =>
        addEdge(
          {
            ...params,
            ...edgeOptions
          },
          edges
        )
      ),
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
    (type: string, handleType: string) => {
      const num = nodes.length;

      setNodes((nodes: Array<Node>) => {
        return [
          ...nodes,
          {
            id: 'node-' + num,
            type,
            position: { x: 0, y: 0 },
            data: { label: 'node ' + num, handleType }
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

  const handleSave = useCallback(() => {
    if (rfInstance) {
      handleLoaderTrue();
      const flow = rfInstance.toObject();
      localStorage.setItem(keyForTempFlowDiagrams, JSON.stringify(flow));
      handleLoaderFalse();
    }
  }, [rfInstance]);

  const handleRestore = useCallback(() => {
    const restoreFlow = () => {
      const value = localStorage.getItem(keyForTempFlowDiagrams);

      if (value) {
        handleLoaderTrue();
        const flow = JSON.parse(value);

        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
        handleLoaderFalse();
      } else {
        alert('Nothing Restore');
        return;
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  return (
    <FlowPT
      title={title}
      nodeName={nodeName}
      edgeName={edgeName}
      addButtonType={addButtonType}
      titleNameRef={titleNameRef}
      nodeNameRef={nodeNameRef}
      edgeNameRef={edgeNameRef}
      nodeHandleTargetDirections={nodeHandleTargetDirections}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
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
      onSetAddButtonType={setAddButtonType}
      onAddNode={handleAddNode}
      onSave={handleSave}
      onRestore={handleRestore}
      onInit={setRfInstance}
    />
  );
};

export default (props: typeFlowCT) => (
  <ReactFlowProvider>
    <FlowCT {...props} />
  </ReactFlowProvider>
);

interface typeFlowCT extends CommonState {
  handleCodeMessage: (code: string, message: string) => void;
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}
