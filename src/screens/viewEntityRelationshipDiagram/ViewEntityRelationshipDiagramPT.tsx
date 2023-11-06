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
import SVG from 'modules/SVG';
import styles from './ViewEntityRelationshipDiagram.module.scss';

const EntityRelationdshipPT = ({
  title,
  errorPopupActive,
  errorMessage,
  tables,
  edges,
  tableTypes,
  edgeTypes,
  onInit,
  onErrorPopup,
  onBack
}: typeEntityRelationdshipPT): JSX.Element => {
  return (
    <>
      <ErrorPopup
        isActive={errorPopupActive}
        errorMessage={errorMessage}
        onConfirm={onErrorPopup}
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
            <div className={styles.backBtn}>
              <span onClick={onBack}>
                <SVG type="back" width="30px" height="30px" />
              </span>
            </div>
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
  tables: Node<any, string | undefined>[];
  edges: Edge<any>[];
  tableTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  errorPopupActive: boolean;
  errorMessage: string;
  onInit: React.Dispatch<any>;
  onErrorPopup: () => void;
  onBack: () => void;
}

export default EntityRelationdshipPT;
