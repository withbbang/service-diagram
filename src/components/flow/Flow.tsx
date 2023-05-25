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
import SVG from 'modules/SVG';

const nodeTypes = { diamondNode: DiamondNode, rectangleNode: RectangleNode };
const edgeTypes = {
  selfConnectingEdge: SelfConnectingEdge
};

const Flow = () => {
  const [id, setId] = useState<string>('');
  const [nodeName, setNodeName] = useState<string>('');
  const [edgeName, setEdgeName] = useState<string>('');
  const [addButtonType, setAddButtonType] = useState<string>('');

  const nodeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  const edgeNameRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;

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
          <button onClick={() => setAddButtonType('diamondNode')}>
            Add Diamond Node
          </button>
          <button onClick={() => setAddButtonType('rectangleNode')}>
            Add Rectangle Node
          </button>
        </div>
      </ReactFlow>
      {(addButtonType === 'rectangleNode' ||
        addButtonType === 'diamondNode') && (
        <div className={styles.addBackground}>
          <div className={styles.close} onClick={() => setAddButtonType('')}>
            <SVG type="close" width="40px" height="40px" fill={'#fff'} />
          </div>
          <div className={styles.modalBody}>
            {[
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
            ].map((type) => (
              <span
                key={type}
                onClick={() => {
                  handleAddNode(addButtonType, type);
                  setAddButtonType('');
                }}
              >
                <SVG
                  type={addButtonType}
                  fillTop={
                    type.includes('top') || type === 'all' ? '#000' : '#aaa'
                  }
                  fillLeft={
                    type.includes('left') || type === 'all' ? '#000' : '#aaa'
                  }
                  fillBottom={
                    type.includes('bottom') || type === 'all' ? '#000' : '#aaa'
                  }
                  fillRight={
                    type.includes('right') || type === 'all' ? '#000' : '#aaa'
                  }
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;
