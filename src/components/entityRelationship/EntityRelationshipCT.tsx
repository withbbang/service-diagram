import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  ReactFlowProvider,
  useReactFlow,
  MarkerType,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  useUpdateNodeInternals
} from 'reactflow';
import EntityRelationshipPT from './EntityRelationshipPT';
import Table from './CustomNodes/Table';
import { typeColumn } from 'modules/types';

const keyForTempERDiagrams = 'tempERDiagrams'; // 로컬 스토리지에 일시 저장할 키값
const tableTypes = { table: Table }; // 커스텀 테이블 타입들
const edgeTypes = {}; // 커스텀 엣지 타입들
const edgeOptions = {
  // // animated: true,
  // markerEnd: {
  //   type: MarkerType.Arrow,
  //   width: 15,
  //   height: 15,
  //   color: '#74c3f0'
  // },
  style: {
    strokeWidth: 2,
    stroke: '#74c3f0'
  }
}; // 엣지 공통 옵션
const initColumn: typeColumn = {
  name: 'id',
  type: 'INTEGER',
  comment: '',
  default: '',
  primary: true,
  unique: true,
  notNull: true,
  autoIncrement: true
}; // 초기 테이블 컬럼
const defaultColumn: typeColumn = {
  name: '',
  type: '',
  comment: '',
  default: '',
  primary: false,
  unique: false,
  notNull: false,
  autoIncrement: false
}; // 컬럼 추가시 생성되는 컬럼

const initialTables: Array<Node> = []; // 테이블 초기화
const initialEdges: Array<Edge> = []; // 엣지 초기화

const EntityRelationshipCT = ({
  handleLoaderTrue,
  handleLoaderFalse
}: typeEntityRelationshipCT): JSX.Element => {
  const [id, setId] = useState<string>(''); // 포커싱된 테이블 및 엣지 id
  const [title, setTitle] = useState<string>(''); // 다이어그램 제목
  const [tableName, setTableName] = useState<string>(''); // 테이블 이름
  const [tableComment, setTableComment] = useState<string>(''); // 테이블 설명
  const [edgeName, setEdgeName] = useState<string>(''); // 엣지 이름
  const [isAddTablePopup, setIsAddTablePopup] = useState<boolean>(false); // 테이블 생성 팝업 관리
  const [rfInstance, setRfInstance] = useState<any>(null); // 로컬스토리지 일시 저장용 다이어그램 인스턴스
  const { setViewport } = useReactFlow(); // 전체젹인 뷰 관련 객체
  const [columns, setColumns] = useState<Array<typeColumn>>([initColumn]); // 테이블 컬럼 배열

  // 다이어그램 제목 input 참조 객체
  const titleNameRef = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  // 포커싱된 테이블 이름 input 참조 객체
  const tableNameRef = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  // 포커싱된 엣지 이름 input 참조 객체
  const edgeNameRef = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;

  const [tables, setTables, handleTablesChange] = useNodesState(initialTables); // 테이블 수정 hook
  const [edges, setEdges, handleEdgesChange] = useEdgesState(initialEdges); // 엣지 수정 hook

  const updateNodeInternals = useUpdateNodeInternals(); // 동적 핸들 추가시 필요한 객체

  // 테이블 변경 적용을 위한 useEffect. 현재는 테이블 내 data 객체의 label만 수정가능
  useEffect(() => {
    setTables((tbls) =>
      tbls.map((table) => {
        if (table.id === id) {
          table.data = {
            ...table.data,
            label: tableName
          };
        }

        return table;
      })
    );
  }, [tableName, setTables]);

  // 엣지 변경 적용을 위한 useEffect. 현재는 엣지 내 data 객체의 label만 수정가능
  useEffect(() => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === id) {
          edge = {
            ...edge,
            label: edgeName
          };
        }

        return edge;
      })
    );
  }, [edgeName, setEdges]);

  // 수정할 컬럼 input ref 접근
  const handleColumnInputChange = useCallback(
    (idx: number, type: string, e: ChangeEvent<HTMLInputElement>) => {
      setColumns((columns: Array<typeColumn>) => {
        return columns.map((column: typeColumn, index) => {
          if (index === idx) {
            const value: string = e.target.value;
            const checked: boolean = e.target.checked;

            column[type] = e.target.type === 'text' ? value : checked;
          }

          return column;
        });
      });
    },
    [columns, setColumns]
  );

  // 새 컬럼 생성
  const handleAddColumn = useCallback(
    (tableId?: string) => {
      // tableId ? setTables((tbls) => {
      //   return tbls.map(table => {
      //     if(tableId === table.id) {
      //       table.data = {
      //         ...table.data,
      //         columns: [...table.data.columns, ]
      //       };
      //     }

      //     return table;
      //   });
      // }) : setColumns([...columns, defaultColumn])

      setColumns([
        ...columns,
        { ...defaultColumn, name: `New Column ${columns.length}` }
      ]);
    },
    [columns, setColumns]
  );

  // 컬럼 제거
  const handleRemoveColumn = useCallback(
    (idx: number, tableId?: string) => {
      // tableId ? setTables((tbls) => {
      //   return tbls.map(table => {
      //     if(tableId === table.id) {
      //       table.data = {
      //         ...table.data,
      //         columns: [...table.data.columns, ]
      //       };
      //     }

      //     return table;
      //   });
      // }) : setColumns([...columns, defaultColumn])

      setColumns(columns.filter((_, index) => index !== idx));
    },
    [columns, setColumns]
  );

  // 테이블 추가 메소드
  const handleAddTable = useCallback(() => {
    setTables((tables: Array<Node>) => {
      const num = tables.length;
      return [
        ...tables.map((table) => ({ ...table, selected: false })),
        {
          id: 'table-' + num,
          type: 'table',
          position: { x: 0, y: 0 },
          selected: true,
          data: {
            tableName,
            tableComment,
            columns
          }
        }
      ];
    });

    handleAddTablePopup();
  }, [tables, columns]);

  // 테이블 생성 팝업 제어 메소드
  const handleAddTablePopup = () => {
    isAddTablePopup && setColumns([initColumn]);
    setIsAddTablePopup(!isAddTablePopup);
  };

  // 엣지로 테이블과 연결하는 순간 동작하는 메소드
  const handleConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((edges) =>
        addEdge(
          {
            ...params,
            ...edgeOptions
          },
          edges
        )
      );
    },
    [setEdges]
  );

  // 테이블 더블 클릭 -> 테이블 이름 input 포커싱
  const handleTableDoubleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    table: Node
  ) => {
    setEdgeName('');
    setId(table.id);
    setTableName(table.data.label);
    tableNameRef && tableNameRef.current && tableNameRef.current.focus();
    edgeNameRef && edgeNameRef.current && edgeNameRef.current.blur();
  };

  // 엣지 더블 클릭 -> 엣지 이름 input 포커싱
  const handleEdgeDoubleClick = (e: React.MouseEvent, edge: any) => {
    setTableName('');
    setId(edge.id);
    edge.label ? setEdgeName(edge.label) : setEdgeName('');
    edgeNameRef && edgeNameRef.current && edgeNameRef.current.focus();
    tableNameRef && tableNameRef.current && tableNameRef.current.blur();
  };

  // input 포커싱 해제
  const handleBlur = (type: string) => {
    setId('');
    if (type === 'title' && titleNameRef && titleNameRef.current) {
      titleNameRef.current.blur();
    } else if (type === 'table' && tableNameRef && tableNameRef.current) {
      setTableName('');
      tableNameRef.current.blur();
    } else if (type === 'edge' && edgeNameRef && edgeNameRef.current) {
      setEdgeName('');
      edgeNameRef.current.blur();
    }
  };

  // 엔터나 ESC 누를시 input 포커싱 해제
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: string
  ) => {
    switch (e.key) {
      case 'Enter':
      case 'Escape':
        handleBlur(type);
        break;
    }
  };

  /**
   * 테이블과 엣지 그리고 각 객체들이 들고 있는 정보가 많을 경우
   * 데이터를 stringify하는데 오래 걸릴 수 있으므로 async 비동기 처리로 넘긴다.
   */
  const handleSave = useCallback(() => {
    const saveFlow = async () => {
      if (rfInstance) {
        handleLoaderTrue();
        const flow = rfInstance.toObject();
        localStorage.setItem(keyForTempERDiagrams, JSON.stringify(flow));
        handleLoaderFalse();
      }
    };

    saveFlow();
  }, [rfInstance]);

  /**
   * 테이블과 엣지 그리고 각 객체들이 들고 있는 정보가 많을 경우
   * 데이터를 파싱하는데 오래 걸릴 수 있으므로 async 비동기 처리로 넘긴다.
   */
  const handleRestore = useCallback(() => {
    const restoreFlow = async () => {
      const value = localStorage.getItem(keyForTempERDiagrams);

      if (value) {
        handleLoaderTrue();
        const flow = JSON.parse(value);

        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setTables(
            flow.nodes.map((table: Node) => {
              const { data, width, height } = table;
              return { ...table, data: { ...data, width, height } };
            }) || []
          );
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
        handleLoaderFalse();
      } else {
        alert('Nothing Restored');
        return;
      }
    };

    restoreFlow();
  }, [setTables, setViewport]);

  // 핸들 추가하기
  const handleAddHandle = useCallback(() => {
    setTables((tbls) =>
      tbls.map((table) => {
        if (table.selected) {
          table.data = {
            ...table.data,
            handleCount: ++table.data.handleCount
          };

          updateNodeInternals(table.id);
        }

        return table;
      })
    );
  }, [tables, setTables]);

  // 핸들 제거하기
  const handleDeleteHandle = useCallback(() => {}, [tables, setTables]);

  return (
    <EntityRelationshipPT
      title={title}
      tableName={tableName}
      tableComment={tableComment}
      edgeName={edgeName}
      isAddTablePopup={isAddTablePopup}
      columns={columns}
      titleNameRef={titleNameRef}
      tableNameRef={tableNameRef}
      edgeNameRef={edgeNameRef}
      tables={tables}
      edges={edges}
      tableTypes={tableTypes}
      edgeTypes={edgeTypes}
      onSetTitle={setTitle}
      onSetTableName={setTableName}
      onSetTableComment={setTableComment}
      onSetEdgeName={setEdgeName}
      onTablesChange={handleTablesChange}
      onEdgesChange={handleEdgesChange}
      onColumnInputChange={handleColumnInputChange}
      onAddColumn={handleAddColumn}
      onAddTable={handleAddTable}
      onRemoveColumn={handleRemoveColumn}
      onConnect={handleConnect}
      onTableDoubleClick={handleTableDoubleClick}
      onEdgeDoubleClick={handleEdgeDoubleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onAddTablePopup={handleAddTablePopup}
      onSave={handleSave}
      onRestore={handleRestore}
      onInit={setRfInstance}
      onAddHandle={handleAddHandle}
    />
  );
};

export default (props: typeEntityRelationshipCT) => (
  <ReactFlowProvider>
    <EntityRelationshipCT {...props} />
  </ReactFlowProvider>
);

interface typeEntityRelationshipCT {
  handleCodeMessage: (code: string, message: string) => void;
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}
