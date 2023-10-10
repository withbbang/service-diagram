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
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import SVG from 'modules/SVG';
import styles from './UpdateFlowDiagram.module.scss';
import 'reactflow/dist/style.css';

const UpdateFlowDiagramPT = ({
  uid,
  uid_,
  title,
  nodeName,
  edgeName,
  corporate,
  corporates,
  isDone,
  titleNameRef,
  nodeNameRef,
  edgeNameRef,
  corporateRef,
  isDoneRef,
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  confirmPopupActive,
  confirmMessage,
  errorPopupActive,
  errorMessage,
  onSetTitle,
  onSetNodeName,
  onSetEdgeName,
  onSetCorporate,
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
  onUpdateBtn,
  onBack,
  onConfirm,
  onCancel,
  onInit,
  onErrorPopup
}: typeUpdateFlowDiagramPT): JSX.Element => {
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
      <ErrorPopup
        isActive={errorPopupActive}
        errorMessage={errorMessage}
        onConfirm={onErrorPopup}
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
            <div className={styles.backBtn}>
              <span onClick={onBack}>
                <SVG type="back" width="30px" height="30px" />
              </span>
            </div>
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
              <select
                value={corporate}
                onChange={(e) => onSetCorporate(e.target.value)}
                onBlur={() => onBlur('corporate')}
                ref={corporateRef}
              >
                {corporates.map((corporate, idx) => (
                  <option key={idx} value={corporate}>
                    {corporate}
                  </option>
                ))}
              </select>
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
                <button onClick={onUpdateBtn}>
                  Permanently Update Diagrams
                </button>
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

interface typeUpdateFlowDiagramPT {
  uid?: string;
  uid_: string;
  title: string;
  nodeName: string;
  edgeName: string;
  corporate: string;
  corporates: Array<string>;
  isDone: string;
  titleNameRef: React.MutableRefObject<HTMLInputElement | null>;
  nodeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  edgeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  corporateRef: React.MutableRefObject<HTMLSelectElement | null>;
  isDoneRef: React.MutableRefObject<HTMLSelectElement | null>;
  nodes: Node<any, string | undefined>[];
  edges: Edge<any>[];
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  confirmPopupActive: boolean;
  confirmMessage: string;
  errorPopupActive: boolean;
  errorMessage: string;
  onSetTitle: React.Dispatch<React.SetStateAction<string>>;
  onSetNodeName: React.Dispatch<React.SetStateAction<string>>;
  onSetEdgeName: React.Dispatch<React.SetStateAction<string>>;
  onSetCorporate: React.Dispatch<React.SetStateAction<string>>;
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
  onUpdateBtn: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onInit: React.Dispatch<any>;
  onErrorPopup: () => void;
  onBack: () => void;
}

export default UpdateFlowDiagramPT;
