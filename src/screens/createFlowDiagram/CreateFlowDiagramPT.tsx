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
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import { handleHasPermission } from 'modules/utils';
import SVG from 'modules/SVG';
import 'driver.js/dist/driver.css';
import 'reactflow/dist/style.css';
import styles from './CreateFlowDiagram.module.scss';

const CreateFlowDiagramPT = ({
  grade,
  title,
  nodeName,
  edgeName,
  company,
  companies,
  isDone,
  titleNameRef,
  nodeNameRef,
  edgeNameRef,
  companyRef,
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
  onSetCompany,
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
  onBack,
  onConfirm,
  onCancel,
  onInit,
  onErrorPopup
}: typeCreateFlowDiagramPT): JSX.Element => {
  return (
    <>
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
              <label>Company:</label>
              <select
                value={company}
                onChange={(e) => onSetCompany(e.target.value)}
                onBlur={() => onBlur('company')}
                ref={companyRef}
              >
                {companies.map((company, idx) => (
                  <option key={idx} value={company}>
                    {company}
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
              {handleHasPermission('c', grade) ? (
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
  grade?: number;
  title: string;
  nodeName: string;
  edgeName: string;
  company: string;
  companies: Array<string>;
  isDone: string;
  titleNameRef: React.MutableRefObject<HTMLInputElement | null>;
  nodeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  edgeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  companyRef: React.MutableRefObject<HTMLSelectElement | null>;
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
  onSetCompany: React.Dispatch<React.SetStateAction<string>>;
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
  onBack: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onInit: React.Dispatch<any>;
  onErrorPopup: () => void;
}

export default CreateFlowDiagramPT;
