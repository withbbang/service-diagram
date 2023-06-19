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
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import Loader from 'components/loader';
import styles from './ViewFlowDiagram.module.scss';

const ViewFlowDiagramPT = ({
  title,
  confirmPopupActive,
  confirmMessage,
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  onConfirm,
  onCancel,
  onInit
}: typeViewFlowDiagramPT): JSX.Element => {
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
  confirmPopupActive: boolean;
  confirmMessage: string;
  nodes: Node<any, string | undefined>[];
  edges: Edge<any>[];
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  onConfirm: () => void;
  onCancel: () => void;
  onInit: React.Dispatch<any>;
}

export default ViewFlowDiagramPT;
