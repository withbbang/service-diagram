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
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import Loader from 'components/loader';
import styles from './CreateFlowDiagram.module.scss';
import 'driver.js/dist/driver.css';
import 'reactflow/dist/style.css';

const CreateFlowDiagramPT = ({
  uid,
  uid_,
  title,
  nodeName,
  edgeName,
  isDone,
  titleNameRef,
  nodeNameRef,
  edgeNameRef,
  isDoneRef,
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  confirmPopupActive,
  confirmMessage,
  onSetTitle,
  onSetNodeName,
  onSetEdgeName,
  onSetIsDone,
  onNodesDelete,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeDoubleClick,
  onEdgeDoubleClick,
  onKeyDown,
  onBlur,
  onAddNode,
  onTemporarilySave,
  onRestore,
  onSaveBtn,
  onConfirm,
  onCancel,
  onInit
}: typeCreateFlowDiagramPT): JSX.Element => {
  return (
    <>
      <Loader />
      <ConfirmPopup
        isActive={confirmPopupActive}
        confirmMessage={confirmMessage}
        confirmType=""
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
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
              <label>Complete:</label>
              <select
                value={isDone}
                onChange={(e) => onSetIsDone(e.target.value)}
                onBlur={() => onBlur('isDone')}
                ref={isDoneRef}
              >
                <option value={'N'}>N</option>
                <option value={'Y'}>Y</option>
              </select>
              <button onClick={() => onAddNode('diamondNode')}>
                Add Diamond Node
              </button>
              <button onClick={() => onAddNode('rectangleNode')}>
                Add Rectangle Node
              </button>
              <button onClick={onTemporarilySave}>
                Temporarily Save Diagrams
              </button>
              <button onClick={onRestore}>Restore Temporary Diagrams</button>
              {uid !== undefined &&
              uid !== null &&
              uid !== '' &&
              uid_ !== '' &&
              uid === uid_ ? (
                <button onClick={onSaveBtn}>Permanently Save Diagrams</button>
              ) : (
                ''
              )}
            </div>
          </ReactFlow>
        </div>
      </div>
    </>
  );
};

interface typeCreateFlowDiagramPT {
  uid?: string;
  uid_: string;
  title: string;
  nodeName: string;
  edgeName: string;
  isDone: string;
  titleNameRef: React.MutableRefObject<HTMLInputElement | null>;
  nodeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  edgeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  isDoneRef: React.MutableRefObject<HTMLSelectElement | null>;
  nodes: Node<any, string | undefined>[];
  edges: Edge<any>[];
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  confirmPopupActive: boolean;
  confirmMessage: string;
  onSetTitle: React.Dispatch<React.SetStateAction<string>>;
  onSetNodeName: React.Dispatch<React.SetStateAction<string>>;
  onSetEdgeName: React.Dispatch<React.SetStateAction<string>>;
  onSetIsDone: React.Dispatch<React.SetStateAction<string>>;
  onNodesDelete: (deleted: Array<Node>) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeDoubleClick: NodeMouseHandler;
  onEdgeDoubleClick: EdgeMouseHandler;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, type: string) => void;
  onBlur: (type: string) => void;
  onAddNode: (type: string) => void;
  onTemporarilySave: () => void;
  onRestore: () => void;
  onSaveBtn: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onInit: React.Dispatch<any>;
}

export default CreateFlowDiagramPT;
