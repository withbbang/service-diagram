import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  MiniMap,
  NodeTypes,
  EdgeTypes
} from 'reactflow';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import Loader from 'components/loader';
import styles from './ViewFlowDiagram.module.scss';

const ViewFlowDiagramPT = ({
  title,
  errorPopupActive,
  errorMessage,
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  onInit,
  onErrorPopup
}: typeViewFlowDiagramPT): JSX.Element => {
  return (
    <>
      <Loader />
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
            onInit={onInit}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background gap={12} size={1} />
            <div className={styles.updatenode__controls}>
              <label>Title:</label>
              <input value={title} disabled />
            </div>
          </ReactFlow>
        </div>
      </div>
    </>
  );
};

interface typeViewFlowDiagramPT {
  title: string;
  nodes: Node<any, string | undefined>[];
  edges: Edge<any>[];
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  errorPopupActive: boolean;
  errorMessage: string;
  onInit: React.Dispatch<any>;
  onErrorPopup: () => void;
}

export default ViewFlowDiagramPT;
