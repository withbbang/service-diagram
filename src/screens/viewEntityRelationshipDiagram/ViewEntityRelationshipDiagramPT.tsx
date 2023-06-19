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
import styles from './ViewEntityRelationshipDiagram.module.scss';

const EntityRelationdshipPT = ({
  title,
  confirmPopupActive,
  confirmMessage,
  tables,
  edges,
  tableTypes,
  edgeTypes,
  onConfirm,
  onCancel,
  onInit
}: typeEntityRelationdshipPT): JSX.Element => {
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
            nodes={tables}
            edges={edges}
            nodeTypes={tableTypes}
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

interface typeEntityRelationdshipPT {
  title: string;
  confirmPopupActive: boolean;
  confirmMessage: string;
  tables: Node<any, string | undefined>[];
  edges: Edge<any>[];
  tableTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  onConfirm: () => void;
  onCancel: () => void;
  onInit: React.Dispatch<any>;
}

export default EntityRelationdshipPT;
