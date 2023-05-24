import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';
import styles from './Flow.module.scss';
import DiamondNode from './customNodes/DiamondNode';
import RectangleNode from './customNodes/RectangleNode';
import 'reactflow/dist/style.css';

const nodeTypes = { diamonNode: DiamondNode, rectangleNode: RectangleNode };

const Flow = () => {
  const [id, setId] = useState<string>('');
  const [nodeName, setNodeName] = useState<string>('');
  const [edgeName, setEdgeName] = useState<string>('');

  const nodeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const edgeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;

  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

  const initialNodes: Array<Node> = [
    {
      id: 'node-1',
      type: 'diamonNode',
      position: { x: 0, y: 0 },
      data: { label: 's' }
    },
    {
      id: 'node-4',
      type: 'rectangleNode',
      position: { x: 0, y: 0 },
      data: { label: 's' }
    },
    {
      id: 'node-5',
      type: 'rectangleNode',
      position: { x: 0, y: 0 },
      data: { label: 's' }
    },
    {
      id: 'node-2',
      type: 'output',
      position: { x: 0, y: 200 },
      data: { label: 'node 2' }
    },
    {
      id: 'node-3',
      type: 'output',
      position: { x: 200, y: 200 },
      data: { label: 'node 3' }
    }
  ];
  const initialEdges: Array<Edge> = [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      sourceHandle: 'a',
      type: 'step'
    },
    {
      id: 'edge-2',
      source: 'node-1',
      target: 'node-3',
      sourceHandle: 'b',
      type: 'step'
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDoubleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    setEdgeName('');
    setId(node.id);
    setNodeName(node.data.label);
    nodeNameRef && nodeNameRef.current && nodeNameRef.current.focus();
    edgeNameRef && edgeNameRef.current && edgeNameRef.current.blur();
  };

  const onEdgeDoubleClick = (e: React.MouseEvent, edge: any) => {
    setNodeName('');
    setId(edge.id);
    edge.label ? setEdgeName(edge.label) : setEdgeName('');
    edgeNameRef && edgeNameRef.current && edgeNameRef.current.focus();
    nodeNameRef && nodeNameRef.current && nodeNameRef.current.blur();
  };

  const onBlur = (type: string) => {
    setId('');
    if (type === 'node' && nodeNameRef && nodeNameRef.current) {
      setNodeName('');
    } else if (type === 'edge' && edgeNameRef && edgeNameRef.current) {
      setEdgeName('');
    }
  };

  return (
    <div className={styles.wrap}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        defaultViewport={defaultViewport}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
        <div className={styles.updatenode__controls}>
          <label>Node Label:</label>
          <input
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            onBlur={() => onBlur('node')}
            ref={nodeNameRef}
          />
          <label>Edge Label:</label>
          <input
            value={edgeName}
            onChange={(e) => setEdgeName(e.target.value)}
            onBlur={() => onBlur('edge')}
            ref={edgeNameRef}
          />
        </div>
      </ReactFlow>
    </div>
  );
};

export default Flow;
