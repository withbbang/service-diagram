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
  useNodesState,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  MarkerType
} from 'reactflow';
import styles from './Flow.module.scss';
import DiamondNode from './customNodes/DiamondNode';
import RectangleNode from './customNodes/RectangleNode';
import SelfConnectingEdge from './customEdges/SelfConnectingEdge';
import 'reactflow/dist/style.css';

const nodeTypes = { diamonNode: DiamondNode, rectangleNode: RectangleNode };
const edgeTypes = {
  selfConnectingEdge: SelfConnectingEdge
};

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
      id: 'node-0',
      type: 'diamonNode',
      position: { x: 0, y: 0 },
      data: { label: 's' }
    },
    {
      id: 'node-3',
      type: 'rectangleNode',
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
      target: 'node-1',
      sourceHandle: 'a',
      type: 'step',
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    },
    {
      id: 'edge-2',
      source: 'node-0',
      target: 'node-2',
      sourceHandle: 'b',
      type: 'step',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
        color: '#FF0072'
      },
      style: {
        strokeWidth: 2,
        stroke: '#FF0072'
      }
    },
    {
      id: 'edge-self',
      source: 'node-4',
      target: 'node-4',
      type: 'step',
      markerEnd: { type: MarkerType.Arrow }
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
          { ...params, type: 'step', markerEnd: { type: MarkerType.Arrow } },
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
              target
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
          ...nodes,
          {
            id: 'node-' + num,
            type,
            position: { x: 0, y: 0 },
            data: { label: 'node ' + num }
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
    if (type === 'node' && nodeNameRef && nodeNameRef.current) {
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

  return (
    <div className={styles.wrap}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={defaultViewport}
        onNodesDelete={handleNodesDelete}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onNodeDoubleClick={handleNodeDoubleClick}
        onEdgeDoubleClick={handleEdgeDoubleClick}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
        <div className={styles.updatenode__controls}>
          <label>Node Label:</label>
          <input
            value={nodeName}
            onKeyDown={(e) => handleKeyDown(e, 'node')}
            onChange={(e) => setNodeName(e.target.value)}
            onBlur={() => handleBlur('node')}
            ref={nodeNameRef}
          />
          <label>Edge Label:</label>
          <input
            value={edgeName}
            onKeyDown={(e) => handleKeyDown(e, 'edge')}
            onChange={(e) => setEdgeName(e.target.value)}
            onBlur={() => handleBlur('edge')}
            ref={edgeNameRef}
          />
          <button onClick={() => handleAddNode('output')}>
            Add Output Node
          </button>
          <button onClick={() => handleAddNode('diamonNode')}>
            Add Diamond Node
          </button>
          <button onClick={() => handleAddNode('rectangleNode')}>
            Add Rectangle Node
          </button>
        </div>
      </ReactFlow>
    </div>
  );
};

export default Flow;
