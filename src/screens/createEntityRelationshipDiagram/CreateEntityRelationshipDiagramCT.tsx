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
import { useNavigate } from 'react-router-dom';
import Table from 'components/entityRelationship/CustomNodes/Table';
import NormalEdge from 'components/entityRelationship/CustomEdges/NormalEdge';
import { typeColumn } from 'modules/types';
import {
  app,
  auth,
  handleHasPermission,
  handleRandomString
} from 'modules/utils';
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
  query,
  getDocs
} from 'firebase/firestore';
import CreateErdDiagramPT from './CreateEntityRelationshipDiagramPT';
import { onAuthStateChanged } from 'firebase/auth';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';

const keyForTempERDiagrams = 'tempERDiagrams'; // 로컬 스토리지에 일시 저장할 키값
const initTableName: string = 'New Table';
const edgeOptions = Object.freeze({
  // animated: true,
  type: 'normal',
  data: {
    sourceRelation: '1',
    targetRelation: '*',
    editPossible: true
  }
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

const CreateErdDiagramCT = ({
  uid,
  nickname,
  handleLoaderTrue,
  handleLoaderFalse
}: typeCreateErdDiagramCT): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const type = 'entity-relationship'; // Firebase 컬렉션 이름
  const navigate = useNavigate();

  const tableTypes = useMemo(() => ({ table: Table }), []); // 커스텀 테이블 타입들
  const edgeTypes = useMemo(() => ({ normal: NormalEdge }), []); // 커스텀 엣지 타입들

  const [grade, setGrade] = useState<number | undefined>(); // 로그인 사용자 등급
  const [company, setCompany] = useState<string>('ALL'); // 회사 이름
  const [companies, setCompanies] = useState<Array<string>>(['ALL']); // 회사 이름들
  const [title, setTitle] = useState<string>(''); // 다이어그램 제목
  const [isDone, setIsDone] = useState<string>('N'); // 완료 여부
  const [tableName, setTableName] = useState<string>(initTableName); // 테이블 이름
  const [tableComment, setTableComment] = useState<string>(''); // 테이블 설명
  const [rfInstance, setRfInstance] = useState<any>(null); // 로컬스토리지 일시 저장용 다이어그램 인스턴스
  const { setViewport } = useReactFlow(); // 전체젹인 뷰 관련 객체
  const [columns, setColumns] = useState<Array<typeColumn>>([initColumn]); // 테이블 컬럼 배열
  const [selectedTableIdxForUpdate, setSelectedTableIdxForUpdate] = useState<
    number | null
  >(null); // 선택된 테이블 인덱스(업데이트용)
  const [selectedTableIdxForDelete, setSelectedTableIdxForDelete] =
    useState<number>(-1); // 선택된 테이블 인덱스(삭제용)
  const [selectedEdgeIdxForUpdate, setSelectedEdgeIdxForUpdate] =
    useState<number>(-1); // 선택된 엣지 인덱스(업데이트용))
  const [selectedEdgeIdxForDelete, setSelectedEdgeIdxForDelete] =
    useState<number>(-1); // 선택된 엣지 인덱스(삭제용)
  const [sourceRelation, setSourceRelation] = useState<string>(''); // 선택된 엣지 sourceRelation
  const [targetRelation, setTargetRelation] = useState<string>(''); // 선택된 엣지 targetRelation
  const [draggingIdx, setDraggingIdx] = useState<number>(-1); // 드래그 중인 컬럼 인덱스
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅
  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅

  // 다이어그램 제목 input 참조 객체
  const titleNameRef = useRef(
    null
  ) as React.MutableRefObject<HTMLInputElement | null>;
  // 기업이름 select 참조 객체
  const companyRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLSelectElement | null>;
  // 완료여부 select 참조 객체
  const isDoneRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLSelectElement | null>;

  const [tables, setTables, handleTablesChange] = useNodesState(initialTables); // 테이블 수정 hook
  const [edges, setEdges, handleEdgesChange] = useEdgesState(initialEdges); // 엣지 수정 hook

  const updateNodeInternals = useUpdateNodeInternals(); // 동적 핸들 추가시 필요한 객체

  // 로그인 여부 판단 훅
  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      handleLoaderTrue();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docSnap = await getDoc(doc(db, 'authority', user.uid));

          if (docSnap !== undefined && docSnap.exists()) {
            const { grade, company } = docSnap.data();

            setGrade(grade);
            setCompanies((prevState) => prevState.concat(company));
          }
        }

        handleLoaderFalse();
      });
    }
  }, [uid]);

  // 엣지 업데이트 제어 팝업
  useEffect(() => {
    if (selectedEdgeIdxForUpdate === -1) {
      setSourceRelation('');
      setTargetRelation('');
    } else {
      const { sourceRelation, targetRelation } =
        edges[selectedEdgeIdxForUpdate].data;
      setSourceRelation(sourceRelation);
      setTargetRelation(targetRelation);
    }
  }, [selectedEdgeIdxForUpdate]);

  // 엣지 삭제 제어 팝업
  useEffect(() => {
    if (selectedEdgeIdxForDelete > -1) {
      setConfirmMessage('Really Delete?');
      setConfirmPopupActive(true);
    } else {
      setConfirmMessage('');
      setConfirmPopupActive(false);
    }
  }, [selectedEdgeIdxForDelete]);

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
      setConfirmPopupActive(true);
    } else {
      setConfirmMessage('');
      setConfirmPopupActive(false);
    }
  }, [selectedTableIdxForDelete]);

  // 유저 권한에 따른 초기 회사 목록 가져오기
  useEffect(() => {
    handleHasPermission('crudm', grade) && handleGetCompanies();
  }, [grade]);

  // 회사 목록 가져오기
  const handleGetCompanies = async () => {
    handleLoaderTrue();

    try {
      const q = query(collection(db, 'company'));
      const querySnapshot = await getDocs(q);

      setCompanies(querySnapshot.docs.map((doc) => doc.data().name));
    } catch (error) {
      console.error(error);
      setErrorMessage('Data Fetching Error');
      setErrorPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

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
                editPossible: true,
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
        edges
          .filter((edge) => edge.source !== id && edge.target !== id)
          .map((edge, idx) => {
            edge.data = {
              ...edge.data,
              idx
            };

            return edge;
          })
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
            ...edgeOptions,
            data: {
              ...edgeOptions.data,
              idx: edges.length,
              onSetSelectedTableIdxForDelete: setSelectedEdgeIdxForDelete
            }
          },
          edges
        )
      );
    },
    [setEdges]
  );

  // 엣지 더블 클릭 -> 엣지 이름 input 포커싱
  const handleEdgeDoubleClick = (e: React.MouseEvent, edge: any) => {
    setSelectedEdgeIdxForUpdate(edge.data.idx);
  };

  // 엣지 삭제 메소드
  const handleDeleteEdge = useCallback(
    (idx: number) => {
      setEdges(
        edges
          .filter((_, index) => index !== idx)
          .map((edge, idx) => {
            edge.data = {
              ...edge.data,
              idx
            };

            return edge;
          })
      );
    },
    [edges]
  );

  // 엣지 관계 업데이트
  const handleUpdateTableRelation = useCallback(() => {
    setEdges((edges: Array<Edge>) =>
      edges.map((edge, idx) => {
        if (idx === selectedEdgeIdxForUpdate) {
          edge.data = {
            ...edge.data,
            sourceRelation,
            targetRelation
          };
        }

        return edge;
      })
    );

    setSelectedEdgeIdxForUpdate(-1);
  }, [edges, selectedEdgeIdxForUpdate, sourceRelation, targetRelation]);

  // input 포커싱 해제
  const handleBlur = (type: string) => {
    if (type === 'title' && titleNameRef && titleNameRef.current) {
      titleNameRef.current.blur();
    } else if (type === 'company' && companyRef && companyRef.current) {
      companyRef.current.blur();
    } else if (type === 'isDone' && isDoneRef && isDoneRef.current) {
      isDoneRef.current.blur();
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
  const handleTemporarilySave = useCallback(() => {
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
          setEdges(
            [
              ...flow.edges.map((edge: Edge) => {
                return {
                  ...edge,
                  data: {
                    ...edge.data,
                    onSetSelectedTableIdxForDelete: setSelectedEdgeIdxForDelete
                  }
                };
              })
            ] || []
          );
          setViewport({ x, y, zoom });
        }
        handleLoaderFalse();
      } else {
        setErrorMessage('Nothing Restored');
        setErrorPopupActive(true);
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

  // confirm 팝업 확인 버튼
  const handleConfirm = async () => {
    if (selectedTableIdxForDelete > -1) {
      handleDeleteTable(selectedTableIdxForDelete);
      setSelectedTableIdxForDelete(-1);
    } else if (selectedEdgeIdxForDelete > -1) {
      handleDeleteEdge(selectedEdgeIdxForDelete);
      setSelectedEdgeIdxForDelete(-1);
    } else {
      setConfirmMessage('');
      setConfirmPopupActive(false);
      handleLoaderTrue();
      try {
        const { id } = await addDoc(collection(db, type), {
          title,
          company,
          content: JSON.stringify(rfInstance.toObject()),
          isDone,
          createdBy: nickname,
          createDt: serverTimestamp(),
          updateDt: ''
        });

        navigate(`/diagram/${type}/${id}`, { replace: true });
      } catch (error) {
        console.error(error);
        setErrorMessage('Data Saving Error');
        setErrorPopupActive(true);
      } finally {
        handleLoaderFalse();
      }
    }
  };

  // confirm 팝업 취소 버튼
  const handleCancel = () => {
    if (selectedTableIdxForDelete > -1) {
      setSelectedTableIdxForDelete(-1);
    } else if (selectedEdgeIdxForDelete > -1) {
      setSelectedEdgeIdxForDelete(-1);
    } else {
      setConfirmMessage('');
      setConfirmPopupActive(false);
    }
  };

  // 저장 버튼
  const handleSaveBtn = async () => {
    setConfirmMessage('Really Save?');
    setConfirmPopupActive(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // error 팝업 확인 버튼
  const handleErrorPopup = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
  };

  return (
    <CreateErdDiagramPT
      grade={grade}
      title={title}
      company={company}
      companies={companies}
      isDone={isDone}
      tableName={tableName}
      tableComment={tableComment}
      selectedTableIdxForUpdate={selectedTableIdxForUpdate}
      selectedTableIdxForDelete={selectedTableIdxForDelete}
      selectedEdgeIdxForUpdate={selectedEdgeIdxForUpdate}
      sourceRelation={sourceRelation}
      targetRelation={targetRelation}
      columns={columns}
      titleNameRef={titleNameRef}
      companyRef={companyRef}
      isDoneRef={isDoneRef}
      tables={tables}
      edges={edges}
      tableTypes={tableTypes}
      edgeTypes={edgeTypes}
      confirmMessage={confirmMessage}
      confirmPopupActive={confirmPopupActive}
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
      onSetTitle={setTitle}
      onSetCompany={setCompany}
      onSetIsDone={setIsDone}
      onSetTableName={setTableName}
      onSetTableComment={setTableComment}
      onTablesChange={handleTablesChange}
      onEdgesChange={handleEdgesChange}
      onColumnInputChange={handleColumnInputChange}
      onSetSelectedTableIdxForUpdate={setSelectedTableIdxForUpdate}
      onSetSelectedEdgeIdxForUpdate={setSelectedEdgeIdxForUpdate}
      onSetSourceRelation={setSourceRelation}
      onSetTargetRelation={setTargetRelation}
      onAddColumn={handleAddColumn}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onAddUpdateTable={handleAddUpdateTable}
      onUpdateTableRelation={handleUpdateTableRelation}
      onRemoveColumn={handleRemoveColumn}
      onConnect={handleConnect}
      onEdgeDoubleClick={handleEdgeDoubleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onTemporarilySave={handleTemporarilySave}
      onRestore={handleRestore}
      onInit={setRfInstance}
      onSaveBtn={handleSaveBtn}
      onBack={handleBack}
      onAddHandle={handleAddHandle}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onErrorPopup={handleErrorPopup}
    />
  );
};

export default (props: typeCreateErdDiagramCT) => (
  <ReactFlowProvider>
    <CreateErdDiagramCT {...props} />
  </ReactFlowProvider>
);

interface typeCreateErdDiagramCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}
