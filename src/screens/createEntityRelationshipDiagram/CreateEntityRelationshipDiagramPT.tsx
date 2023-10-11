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
import Loader from 'components/loader';
import SVG from 'modules/SVG';
import { typeColumn } from 'modules/types';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import styles from './CreateEntityRelationshipDiagram.module.scss';
import 'reactflow/dist/style.css';
import Column from 'components/entityRelationship/Column';
import { handleHasPermission } from 'modules/utils';

const CreateErdDiagramPT = ({
  grade,
  title,
  company,
  companies,
  isDone,
  tableName,
  tableComment,
  selectedTableIdxForUpdate,
  selectedEdgeIdxForUpdate,
  sourceRelation,
  targetRelation,
  columns,
  titleNameRef,
  companyRef,
  isDoneRef,
  tables,
  edges,
  tableTypes,
  edgeTypes,
  confirmMessage,
  confirmPopupActive,
  errorPopupActive,
  errorMessage,
  onSetTitle,
  onSetCompany,
  onSetIsDone,
  onSetTableName,
  onSetTableComment,
  onTablesChange,
  onEdgesChange,
  onColumnInputChange,
  onAddColumn,
  onDragStart,
  onDragEnd,
  onDragOver,
  onSetSelectedTableIdxForUpdate,
  onSetSelectedEdgeIdxForUpdate,
  onSetSourceRelation,
  onSetTargetRelation,
  onAddUpdateTable,
  onUpdateTableRelation,
  onRemoveColumn,
  onConnect,
  onEdgeDoubleClick,
  onKeyDown,
  onBlur,
  onTemporarilySave,
  onRestore,
  onInit,
  onSaveBtn,
  onBack,
  onAddHandle,
  onConfirm,
  onCancel,
  onErrorPopup
}: typeCreateErdDiagramPT): JSX.Element => {
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
          deleteKeyCode={null}
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
          <div className={styles.updatetable__controls}>
            <label>Title:</label>
            <input
              value={title}
              onKeyDown={(e) => onKeyDown(e, 'title')}
              onChange={(e) => onSetTitle(e.target.value)}
              onBlur={() => onBlur('title')}
              ref={titleNameRef}
            />
            <label>Companie:</label>
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
            <button onClick={() => onSetSelectedTableIdxForUpdate(-1)}>
              Add Table
            </button>
            <button onClick={() => onTemporarilySave()}>
              Temporarily Save Diagrams
            </button>
            <button onClick={() => onRestore()}>
              Restore Temporary Diagrams
            </button>
            {handleHasPermission(['c'], grade) ? (
              <button onClick={onSaveBtn}>Permanently Save Diagrams</button>
            ) : (
              ''
            )}
            {/* <button onClick={() => onAddHandle()}>Add Handle</button> */}
          </div>
          {selectedTableIdxForUpdate !== null && (
            <div className={styles.background}>
              <div
                className={styles.close}
                onClick={() => onSetSelectedTableIdxForUpdate(null)}
              >
                <SVG type="close" width="40px" height="40px" fill={'#fff'} />
              </div>
              <div className={[styles.modalBody, styles.updateTable].join(' ')}>
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
          {selectedEdgeIdxForUpdate > -1 && (
            <div className={styles.background}>
              <div
                className={styles.close}
                onClick={() => onSetSelectedEdgeIdxForUpdate(-1)}
              >
                <SVG type="close" width="40px" height="40px" fill={'#fff'} />
              </div>
              <div className={[styles.modalBody, styles.updateEdge].join(' ')}>
                <div className={styles.selectBtnsDiv}>
                  <span className={styles.source}>Change Relation</span>
                  <button
                    className={
                      sourceRelation === '1'
                        ? [styles.selectBtn, styles.selected].join(' ')
                        : styles.selectBtn
                    }
                    onClick={() => onSetSourceRelation('1')}
                  >
                    1
                  </button>
                  <button
                    className={
                      sourceRelation === '*'
                        ? [styles.selectBtn, styles.selected].join(' ')
                        : styles.selectBtn
                    }
                    onClick={() => onSetSourceRelation('*')}
                  >
                    *
                  </button>
                </div>
                <div className={styles.selectBtnsDiv}>
                  <span className={styles.target}>Change Relation</span>
                  <button
                    className={
                      targetRelation === '1'
                        ? [styles.selectBtn, styles.selected].join(' ')
                        : styles.selectBtn
                    }
                    onClick={() => onSetTargetRelation('1')}
                  >
                    1
                  </button>
                  <button
                    className={
                      targetRelation === '*'
                        ? [styles.selectBtn, styles.selected].join(' ')
                        : styles.selectBtn
                    }
                    onClick={() => onSetTargetRelation('*')}
                  >
                    *
                  </button>
                </div>
                <div className={styles.btnsDiv}>
                  <button onClick={() => onSetSelectedEdgeIdxForUpdate(-1)}>
                    Cancel
                  </button>
                  <button onClick={onUpdateTableRelation}>Commit</button>
                </div>
              </div>
            </div>
          )}
        </ReactFlow>
      </div>
    </>
  );
};

interface typeCreateErdDiagramPT {
  grade?: number;
  title: string;
  company: string;
  companies: Array<string>;
  isDone: string;
  tableName: string;
  tableComment: string;
  selectedTableIdxForUpdate: number | null;
  selectedTableIdxForDelete: number;
  selectedEdgeIdxForUpdate: number;
  sourceRelation: string;
  targetRelation: string;
  columns: Array<typeColumn>;
  titleNameRef: React.MutableRefObject<HTMLInputElement | null>;
  companyRef: React.MutableRefObject<HTMLSelectElement | null>;
  isDoneRef: React.MutableRefObject<HTMLSelectElement | null>;
  tables: Node<any, string | undefined>[];
  edges: Edge<any>[];
  tableTypes: NodeTypes;
  edgeTypes: EdgeTypes;
  confirmMessage: string;
  confirmPopupActive: boolean;
  errorPopupActive: boolean;
  errorMessage: string;
  onSetTitle: React.Dispatch<React.SetStateAction<string>>;
  onSetCompany: React.Dispatch<React.SetStateAction<string>>;
  onSetIsDone: React.Dispatch<React.SetStateAction<string>>;
  onSetTableName: React.Dispatch<React.SetStateAction<string>>;
  onSetTableComment: React.Dispatch<React.SetStateAction<string>>;
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
  onSetSelectedEdgeIdxForUpdate: React.Dispatch<React.SetStateAction<number>>;
  onSetSourceRelation: React.Dispatch<React.SetStateAction<string>>;
  onSetTargetRelation: React.Dispatch<React.SetStateAction<string>>;
  onAddColumn: (tableId?: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, idx: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>, idx: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, idx: number) => void;
  onAddUpdateTable: () => void;
  onUpdateTableRelation: () => void;
  onRemoveColumn: (idx: number, tableId?: string) => void;
  onConnect: OnConnect;
  onEdgeDoubleClick: EdgeMouseHandler;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, type: string) => void;
  onBlur: (type: string) => void;
  onTemporarilySave: () => void;
  onRestore: () => void;
  onInit: React.Dispatch<any>;
  onSaveBtn: () => void;
  onBack: () => void;
  onAddHandle: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onErrorPopup: () => void;
}

export default CreateErdDiagramPT;
