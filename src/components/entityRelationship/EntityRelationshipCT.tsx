import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
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
import NormalEdge from './CustomEdges/NormalEdge';
import { typeColumn } from 'modules/types';
import { handleRandomString } from 'modules/utils';

const keyForTempERDiagrams = 'tempERDiagrams'; // 로컬 스토리지에 일시 저장할 키값
const edgeOptions = Object.freeze({
  // animated: true,
  // markerEnd: {
  //   type: MarkerType.Arrow,
  //   width: 15,
  //   height: 15,
  //   color: '#74c3f0'
  // },
  type: 'normal'
  // style: {
  //   strokeWidth: 2,
  //   stroke: '#74c3f0'
  // }
}); // 엣지 공통 옵션
const initColumn: typeColumn = Object.freeze({
  name: 'id',
  type: 'INTEGER',
  comment: '',
  default: '',
  primary: true,
  unique: true,
  notNull: true,
  autoIncrement: true
}); // 초기 테이블 컬럼
const defaultColumn: typeColumn = Object.freeze({
  name: '',
  type: '',
  comment: '',
  default: '',
  primary: false,
  unique: false,
  notNull: false,
  autoIncrement: false
}); // 컬럼 추가시 생성되는 컬럼

const initialTables: Array<Node> = []; // 테이블 초기화
const initialEdges: Array<Edge> = []; // 엣지 초기화

const initTableName: string = 'New Table';

const EntityRelationshipCT = ({
  handleLoaderTrue,
  handleLoaderFalse
}: typeEntityRelationshipCT): JSX.Element => {
  const tableTypes = useMemo(() => ({ table: Table }), []); // 커스텀 테이블 타입들
  const edgeTypes = useMemo(() => ({ normal: NormalEdge }), []); // 커스텀 엣지 타입들

  const [id, setId] = useState<string>(''); // 포커싱된 테이블 및 엣지 id
  const [title, setTitle] = useState<string>(''); // 다이어그램 제목
  const [tableName, setTableName] = useState<string>(initTableName); // 테이블 이름
  const [tableComment, setTableComment] = useState<string>(''); // 테이블 설명
  const [edgeName, setEdgeName] = useState<string>(''); // 엣지 이름
  const [rfInstance, setRfInstance] = useState<any>(null); // 로컬스토리지 일시 저장용 다이어그램 인스턴스
  const { setViewport } = useReactFlow(); // 전체젹인 뷰 관련 객체
  const [columns, setColumns] = useState<Array<typeColumn>>([initColumn]); // 테이블 컬럼 배열
  const [selectedTableIdxForUpdate, setSelectedTableIdxForUpdate] = useState<
    number | null
  >(null); // 선택된 테이블 인덱스(업데이트용)
  const [selectedTableIdxForDelete, setSelectedTableIdxForDelete] =
    useState<number>(-1); // 선택된 테이블 인덱스(삭제용)
  const [draggingIdx, setDraggingIdx] = useState<number>(-1); // 드래그 중인 컬럼 인덱스
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  // 다이어그램 제목 input 참조 객체
  const titleNameRef = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  // 포커싱된 엣지 이름 input 참조 객체
  const edgeNameRef = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;

  const [tables, setTables, handleTablesChange] = useNodesState(initialTables); // 테이블 수정 hook
  const [edges, setEdges, handleEdgesChange] = useEdgesState(initialEdges); // 엣지 수정 hook

  const updateNodeInternals = useUpdateNodeInternals(); // 동적 핸들 추가시 필요한 객체

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

  // 테이블 생성 및 업데이트 제어 팝업
  useEffect(() => {
    if (selectedTableIdxForUpdate === null) {
    } else if (selectedTableIdxForUpdate === -1) {
      setTableName(initTableName);
      setTableComment('');
      setColumns([{ ...initColumn }]);
    } else {
      const { tableName, tableComment, columns } =
        tables[selectedTableIdxForUpdate].data;

      setTableName(tableName);
      setTableComment(tableComment);
      setColumns(columns);
    }
  }, [selectedTableIdxForUpdate]);

  // 테이블 삭제 제어 팝업
  useEffect(() => {
    if (selectedTableIdxForDelete > -1) {
      setConfirmMessage('Really Delete?');
    } else {
      setConfirmMessage('');
    }
  }, [selectedTableIdxForDelete]);

  // 수정할 컬럼 input 접근
  const handleColumnInputChange = useCallback(
    (
      idx: number,
      type: string,
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setColumns((columns: Array<typeColumn>) => {
        return columns.map((column: typeColumn, index) => {
          if (index === idx) {
            if (e.target.tagName === 'SELECT') {
              column[type] = e.target.value;
            } else {
              const { value, checked } = e.target as HTMLInputElement;
              column[type] = e.target.type === 'text' ? value : checked;
            }
          }

          return column;
        });
      });
    },
    [columns, setColumns]
  );

  // 새 컬럼 생성
  const handleAddColumn = useCallback(() => {
    setColumns([
      ...columns,
      { ...defaultColumn, name: `New Column ${columns.length}` }
    ]);
  }, [columns, setColumns]);

  // 컬럼 제거
  const handleRemoveColumn = useCallback(
    (idx: number) => {
      setColumns(columns.filter((_, index) => index !== idx));
    },
    [columns, setColumns]
  );

  // 컬럼 드래그 시작 콜백
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    setDraggingIdx(idx);
    e.currentTarget.style.opacity = '0.4';
  };

  // 컬럼 드래그 종료 콜백
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    e.stopPropagation();
    e.preventDefault();
    setDraggingIdx(-1);
    e.currentTarget.style.opacity = '';
  };

  // 컬럼 드래그 콜백
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    e.stopPropagation();
    e.preventDefault();
    const newColumns = columns;
    const draggedItem = newColumns[draggingIdx];
    newColumns.splice(draggingIdx, 1);
    newColumns.splice(idx, 0, draggedItem);
    setColumns([...newColumns]);
    setDraggingIdx(idx);
  };

  // 테이블 추가/수정 메소드
  const handleAddUpdateTable = useCallback(() => {
    setTables((tables: Array<Node>) => {
      let returnArr: Array<Node> = [];
      if (selectedTableIdxForUpdate !== null) {
        if (selectedTableIdxForUpdate > -1) {
          returnArr = [
            ...tables.map((table, idx) => {
              if (selectedTableIdxForUpdate === idx) {
                table.data = {
                  ...table.data,
                  tableName,
                  tableComment,
                  columns
                };
              }

              return table;
            })
          ];
        } else {
          returnArr = [
            ...tables.map((table) => ({ ...table, selected: false })),
            {
              id: 'table-' + handleRandomString(),
              type: 'table',
              position: { x: 0, y: 0 },
              selected: true,
              data: {
                idx: tables.length,
                tableName,
                tableComment,
                columns,
                onSetSelectedTableIdxForUpdate: setSelectedTableIdxForUpdate,
                onSetSelectedTableIdxForDelete: setSelectedTableIdxForDelete
              }
            }
          ];
        }
      }

      return returnArr;
    });

    setSelectedTableIdxForUpdate(null);
  }, [tables, tableName, tableComment, columns, selectedTableIdxForUpdate]);

  // 테이블 삭제 메소드
  const handleDeleteTable = useCallback(
    (idx: number) => {
      const { id } = tables[idx];
      setEdges(
        edges.filter((edge) => edge.source !== id && edge.target !== id)
      );
      setTables(
        tables
          .filter((_, index) => index !== idx)
          .map((table, idx) => {
            table.data = {
              ...table.data,
              idx
            };

            return table;
          })
      );
    },
    [tables, edges]
  );

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

  // 엣지 더블 클릭 -> 엣지 이름 input 포커싱
  const handleEdgeDoubleClick = (e: React.MouseEvent, edge: any) => {
    setTableName('');
    setId(edge.id);
    edge.label ? setEdgeName(edge.label) : setEdgeName('');
    edgeNameRef && edgeNameRef.current && edgeNameRef.current.focus();
  };

  // input 포커싱 해제
  const handleBlur = (type: string) => {
    setId('');
    if (type === 'title' && titleNameRef && titleNameRef.current) {
      titleNameRef.current.blur();
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
            [
              ...flow.nodes.map((node: Node) => {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    onSetSelectedTableIdxForUpdate:
                      setSelectedTableIdxForUpdate,
                    onSetSelectedTableIdxForDelete: setSelectedTableIdxForDelete
                  }
                };
              })
            ] || []
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

  // confirm 팝업 확인 버튼 TODO: 추후 confirm팝업의 용도가 달라지므로 용도에 따라 콜백 함수 구분해야함
  const handleConfirm = () => {
    handleDeleteTable(selectedTableIdxForDelete);
    setSelectedTableIdxForDelete(-1);
  };

  // confirm 팝업 취소 버튼 TODO: 추후 confirm팝업의 용도가 달라지므로 용도에 따라 콜백 함수 구분해야함
  const handleCancel = () => {
    setSelectedTableIdxForDelete(-1);
  };

  return (
    <EntityRelationshipPT
      title={title}
      tableName={tableName}
      tableComment={tableComment}
      edgeName={edgeName}
      selectedTableIdxForUpdate={selectedTableIdxForUpdate}
      selectedTableIdxForDelete={selectedTableIdxForDelete}
      columns={columns}
      titleNameRef={titleNameRef}
      edgeNameRef={edgeNameRef}
      tables={tables}
      edges={edges}
      tableTypes={tableTypes}
      edgeTypes={edgeTypes}
      confirmMessage={confirmMessage}
      onSetTitle={setTitle}
      onSetTableName={setTableName}
      onSetTableComment={setTableComment}
      onSetEdgeName={setEdgeName}
      onTablesChange={handleTablesChange}
      onEdgesChange={handleEdgesChange}
      onColumnInputChange={handleColumnInputChange}
      onSetSelectedTableIdxForUpdate={setSelectedTableIdxForUpdate}
      onAddColumn={handleAddColumn}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onAddUpdateTable={handleAddUpdateTable}
      onRemoveColumn={handleRemoveColumn}
      onConnect={handleConnect}
      onEdgeDoubleClick={handleEdgeDoubleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onSave={handleSave}
      onRestore={handleRestore}
      onInit={setRfInstance}
      onAddHandle={handleAddHandle}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
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
