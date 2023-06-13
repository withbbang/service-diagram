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
import styles from './EntityRelationship.module.scss';
import 'reactflow/dist/style.css';
import SVG from 'modules/SVG';
import { typeColumn } from 'modules/types';

const EntityRelationshipPT = ({
  title,
  tableName,
  edgeName,
  isAddTablePopup,
  columns,
  titleNameRef,
  tableNameRef,
  edgeNameRef,
  tables,
  edges,
  tableTypes,
  edgeTypes,
  onSetTitle,
  onSetTableName,
  onSetEdgeName,
  onTablesChange,
  onEdgesChange,
  onConnect,
  onTableDoubleClick,
  onEdgeDoubleClick,
  onKeyDown,
  onBlur,
  onAddTablePopup,
  onSave,
  onRestore,
  onInit,
  onAddHandle
}: typeEntityRelationshipPT): JSX.Element => {
  return (
    <>
      <div className={styles.wrap}>
        <ReactFlow
          nodes={tables}
          edges={edges}
          nodeTypes={tableTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onTablesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onTableDoubleClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onInit={onInit}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
          <div className={styles.updatetable__controls}>
            <label>Title Label:</label>
            <input
              value={title}
              onKeyDown={(e) => onKeyDown(e, 'title')}
              onChange={(e) => onSetTitle(e.target.value)}
              onBlur={() => onBlur('title')}
              ref={titleNameRef}
            />
            <label>Table Label:</label>
            <input
              value={tableName}
              onKeyDown={(e) => onKeyDown(e, 'table')}
              onChange={(e) => onSetTableName(e.target.value)}
              onBlur={() => onBlur('table')}
              ref={tableNameRef}
            />
            <label>Edge Label:</label>
            <input
              value={edgeName}
              onKeyDown={(e) => onKeyDown(e, 'edge')}
              onChange={(e) => onSetEdgeName(e.target.value)}
              onBlur={() => onBlur('edge')}
              ref={edgeNameRef}
            />
            <button onClick={onAddTablePopup}>Add Table</button>
            <button onClick={() => onSave()}>Temporarily Save Diagrams</button>
            <button onClick={() => onRestore()}>
              Restore Temporary Diagrams
            </button>
            <button onClick={() => onAddHandle()}>Add Handle</button>
          </div>
        </ReactFlow>
        {isAddTablePopup && (
          <div className={styles.background}>
            <div className={styles.close} onClick={onAddTablePopup}>
              <SVG type="close" width="40px" height="40px" fill={'#fff'} />
            </div>
            <div className={styles.modalBody}>
              <div className={styles.inputDiv}>
                <span>Table Name:</span>
                <input />
              </div>
              <div className={styles.inputDiv}>
                <span>Table Comment:</span>
                <input />
              </div>
              <div className={styles.columnsDiv}>
                {Array.isArray(columns) &&
                  columns.length > 0 &&
                  columns.map((column: typeColumn, idx) => (
                    <div key={idx} className={styles.column}>
                      <div className={styles.inputs}>
                        <div className={styles.inputDiv}>
                          <span>Name</span>
                          <input value={column.name} />
                        </div>
                        <div className={styles.inputDiv}>
                          <span>Type</span>
                          <input value={column.type} />
                        </div>
                        <div className={styles.inputDiv}>
                          <span>Comment</span>
                          <input value={column.comment} />
                        </div>
                        <div className={styles.inputDiv}>
                          <span>Default</span>
                          <input value={column.default} />
                        </div>
                      </div>
                      <div className={styles.checkBoxes}>
                        <div className={styles.inputDiv}>
                          <input type="checkbox" checked={column.primary} />
                          <span>Primary</span>
                        </div>
                        <div className={styles.inputDiv}>
                          <input type="checkbox" checked={column.unique} />
                          <span>Unique</span>
                        </div>
                        <div className={styles.inputDiv}>
                          <input type="checkbox" checked={column.notNull} />
                          <span>Not Null</span>
                        </div>
                        <div className={styles.inputDiv}>
                          <input
                            type="checkbox"
                            checked={column.autoIncrement}
                          />
                          <span>Auto Increment</span>
                        </div>
                      </div>
                      <div className={styles.buttons}>
                        <button>Remove Column</button>
                        <button>Add Column</button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className={styles.btnsDiv}>
                <button onClick={onAddTablePopup}>Cancel</button>
                <button>Commit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

interface typeEntityRelationshipPT {
  title: string;
  tableName: string;
  edgeName: string;
  isAddTablePopup: boolean;
  columns: Array<typeColumn>;
  titleNameRef: React.MutableRefObject<HTMLInputElement | null>;
  tableNameRef: React.MutableRefObject<HTMLInputElement | null>;
  edgeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  tables: Node<any, string | undefined>[];
  edges: Edge<any>[];
  tableTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  onSetTitle: React.Dispatch<React.SetStateAction<string>>;
  onSetTableName: React.Dispatch<React.SetStateAction<string>>;
  onSetEdgeName: React.Dispatch<React.SetStateAction<string>>;
  onTablesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onTableDoubleClick: NodeMouseHandler;
  onEdgeDoubleClick: EdgeMouseHandler;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, type: string) => void;
  onBlur: (type: string) => void;
  onAddTablePopup: () => void;
  onSave: () => void;
  onRestore: () => void;
  onInit: React.Dispatch<any>;
  onAddHandle: () => void;
}

export default EntityRelationshipPT;
