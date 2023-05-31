import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  EdgeTypes,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeMouseHandler,
  EdgeMouseHandler
} from 'reactflow';
import styles from './Flow.module.scss';
import 'reactflow/dist/style.css';

const FlowPT = ({
  title,
  nodeName,
  edgeName,
  titleNameRef,
  nodeNameRef,
  edgeNameRef,
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  onSetTitle,
  onSetNodeName,
  onSetEdgeName,
  onNodesDelete,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeDoubleClick,
  onEdgeDoubleClick,
  onKeyDown,
  onBlur,
  onAddNode,
  onSave,
  onRestore,
  onInit
}: typeFlowPT) => {
  return (
    <>
      <div className={styles.wrap}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesDelete={onNodesDelete}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onInit={onInit}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
          <div className={styles.updatenode__controls}>
            <label>Title Label:</label>
            <input
              value={title}
              onKeyDown={(e) => onKeyDown(e, 'title')}
              onChange={(e) => onSetTitle(e.target.value)}
              onBlur={() => onBlur('title')}
              ref={titleNameRef}
            />
            <label>Node Label:</label>
            <input
              value={nodeName}
              onKeyDown={(e) => onKeyDown(e, 'node')}
              onChange={(e) => onSetNodeName(e.target.value)}
              onBlur={() => onBlur('node')}
              ref={nodeNameRef}
            />
            <label>Edge Label:</label>
            <input
              value={edgeName}
              onKeyDown={(e) => onKeyDown(e, 'edge')}
              onChange={(e) => onSetEdgeName(e.target.value)}
              onBlur={() => onBlur('edge')}
              ref={edgeNameRef}
            />
            <button onClick={() => onAddNode('diamondNode')}>
              Add Diamond Node
            </button>
            <button onClick={() => onAddNode('rectangleNode')}>
              Add Rectangle Node
            </button>
            <button onClick={() => onSave()}>Temporarily Save Diagrams</button>
            <button onClick={() => onRestore()}>
              Restore Temporary Diagrams
            </button>
          </div>
        </ReactFlow>
      </div>
    </>
  );
};

interface typeFlowPT {
  title: string;
  nodeName: string;
  edgeName: string;
  titleNameRef: React.MutableRefObject<HTMLInputElement | null>;
  nodeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  edgeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  nodes: Node<any, string | undefined>[];
  edges: Edge<any>[];
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  onSetTitle: React.Dispatch<React.SetStateAction<string>>;
  onSetNodeName: React.Dispatch<React.SetStateAction<string>>;
  onSetEdgeName: React.Dispatch<React.SetStateAction<string>>;
  onNodesDelete: (deleted: Array<Node>) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeDoubleClick: NodeMouseHandler;
  onEdgeDoubleClick: EdgeMouseHandler;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, type: string) => void;
  onBlur: (type: string) => void;
  onAddNode: (type: string) => void;
  onSave: () => void;
  onRestore: () => void;
  onInit: React.Dispatch<any>;
}

export default FlowPT;
