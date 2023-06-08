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

const EntityRelationshipPT = ({
  title,
  tableName,
  edgeName,
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
  onTablesDelete,
  onTablesChange,
  onEdgesChange,
  onConnect,
  onTableDoubleClick,
  onEdgeDoubleClick,
  onKeyDown,
  onBlur,
  onAddTable,
  onSave,
  onRestore,
  onInit
}: typeEntityRelationshipPT): JSX.Element => {
  return (
    <>
      <div className={styles.wrap}>
        <ReactFlow
          nodes={tables}
          edges={edges}
          nodeTypes={tableTypes}
          edgeTypes={edgeTypes}
          onNodesDelete={onTablesDelete}
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
            <button>Add Table</button>
            <button onClick={() => onSave()}>Temporarily Save Diagrams</button>
            <button onClick={() => onRestore()}>
              Restore Temporary Diagrams
            </button>
          </div>
        </ReactFlow>
      </div>
    </>
  );
};

interface typeEntityRelationshipPT {
  title: string;
  tableName: string;
  edgeName: string;
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
  onTablesDelete: (deleted: Array<Node>) => void;
  onTablesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onTableDoubleClick: NodeMouseHandler;
  onEdgeDoubleClick: EdgeMouseHandler;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, type: string) => void;
  onBlur: (type: string) => void;
  onAddTable: (type: string) => void;
  onSave: () => void;
  onRestore: () => void;
  onInit: React.Dispatch<any>;
}

export default EntityRelationshipPT;
