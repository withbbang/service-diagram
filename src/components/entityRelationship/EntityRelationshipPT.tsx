import React, { ChangeEvent } from 'react';
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
  EdgeMouseHandler
} from 'reactflow';
import styles from './EntityRelationship.module.scss';
import 'reactflow/dist/style.css';
import SVG from 'modules/SVG';
import { typeColumn } from 'modules/types';
import Column from './Column';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';

const EntityRelationshipPT = ({
  title,
  tableName,
  tableComment,
  edgeName,
  selectedTableIdxForUpdate,
  selectedTableIdxForDelete,
  columns,
  titleNameRef,
  edgeNameRef,
  tables,
  edges,
  tableTypes,
  edgeTypes,
  confirmMessage,
  onSetTitle,
  onSetTableName,
  onSetTableComment,
  onSetEdgeName,
  onTablesChange,
  onEdgesChange,
  onColumnInputChange,
  onAddColumn,
  onDragStart,
  onDragEnd,
  onDragOver,
  onSetSelectedTableIdxForUpdate,
  onAddUpdateTable,
  onRemoveColumn,
  onConnect,
  onEdgeDoubleClick,
  onKeyDown,
  onBlur,
  onSave,
  onRestore,
  onInit,
  onAddHandle,
  onConfirm,
  onCancel
}: typeEntityRelationshipPT): JSX.Element => {
  return (
    <>
      <ConfirmPopup
        isActive={selectedTableIdxForDelete > -1}
        confirmMessage={confirmMessage}
        confirmType=""
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <div className={styles.wrap}>
        <ReactFlow
          nodes={tables}
          edges={edges}
          nodeTypes={tableTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onTablesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
            <label>Edge Label:</label>
            <input
              value={edgeName}
              onKeyDown={(e) => onKeyDown(e, 'edge')}
              onChange={(e) => onSetEdgeName(e.target.value)}
              onBlur={() => onBlur('edge')}
              ref={edgeNameRef}
            />
            <button onClick={() => onSetSelectedTableIdxForUpdate(-1)}>
              Add Table
            </button>
            <button onClick={() => onSave()}>Temporarily Save Diagrams</button>
            <button onClick={() => onRestore()}>
              Restore Temporary Diagrams
            </button>
            <button onClick={() => onAddHandle()}>Add Handle</button>
          </div>
          {selectedTableIdxForUpdate !== null && (
            <div className={styles.background}>
              <div
                className={styles.close}
                onClick={() => onSetSelectedTableIdxForUpdate(null)}
              >
                <SVG type="close" width="40px" height="40px" fill={'#fff'} />
              </div>
              <div className={styles.modalBody}>
                <div className={styles.inputDiv}>
                  <span>Table Name:</span>
                  <input
                    value={tableName}
                    onChange={(e) => onSetTableName(e.target.value)}
                  />
                </div>
                <div className={styles.inputDiv}>
                  <span>Table Comment:</span>
                  <input
                    value={tableComment}
                    onChange={(e) => onSetTableComment(e.target.value)}
                  />
                </div>
                <div className={styles.columnsDiv}>
                  {Array.isArray(columns) &&
                    columns.length > 0 &&
                    columns.map((column: typeColumn, idx) => (
                      <div key={idx} className={styles.column}>
                        <Column
                          idx={idx}
                          column={column}
                          onColumnInputChange={onColumnInputChange}
                          onAddColumn={onAddColumn}
                          onRemoveColumn={onRemoveColumn}
                          onDragStart={onDragStart}
                          onDragEnd={onDragEnd}
                          onDragOver={onDragOver}
                        />
                      </div>
                    ))}
                </div>
                <div className={styles.btnsDiv}>
                  <button onClick={() => onSetSelectedTableIdxForUpdate(null)}>
                    Cancel
                  </button>
                  <button onClick={onAddUpdateTable}>Commit</button>
                </div>
              </div>
            </div>
          )}
        </ReactFlow>
      </div>
    </>
  );
};

interface typeEntityRelationshipPT {
  title: string;
  tableName: string;
  tableComment: string;
  edgeName: string;
  selectedTableIdxForUpdate: number | null;
  selectedTableIdxForDelete: number;
  columns: Array<typeColumn>;
  titleNameRef: React.MutableRefObject<HTMLInputElement | null>;
  edgeNameRef: React.MutableRefObject<HTMLInputElement | null>;
  tables: Node<any, string | undefined>[];
  edges: Edge<any>[];
  tableTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  confirmMessage: string;
  onSetTitle: React.Dispatch<React.SetStateAction<string>>;
  onSetTableName: React.Dispatch<React.SetStateAction<string>>;
  onSetTableComment: React.Dispatch<React.SetStateAction<string>>;
  onSetEdgeName: React.Dispatch<React.SetStateAction<string>>;
  onTablesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onColumnInputChange: (
    idx: number,
    type: string,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSetSelectedTableIdxForUpdate: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  onAddColumn: (tableId?: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, idx: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>, idx: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, idx: number) => void;
  onAddUpdateTable: () => void;
  onRemoveColumn: (idx: number, tableId?: string) => void;
  onConnect: OnConnect;
  onEdgeDoubleClick: EdgeMouseHandler;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, type: string) => void;
  onBlur: (type: string) => void;
  onSave: () => void;
  onRestore: () => void;
  onInit: React.Dispatch<any>;
  onAddHandle: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default EntityRelationshipPT;
