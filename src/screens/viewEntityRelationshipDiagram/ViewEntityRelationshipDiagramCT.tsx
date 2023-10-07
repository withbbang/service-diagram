import React, { useEffect, useMemo, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app, handleHasPermission } from 'modules/utils';
import { doc, getDoc } from 'firebase/firestore';
import {
  Edge,
  Node,
  MarkerType,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from 'reactflow';
import { useNavigate, useParams } from 'react-router-dom';
import Table from 'components/entityRelationship/CustomNodes/Table';
import NormalEdge from 'components/entityRelationship/CustomEdges/NormalEdge';
import ViewEntityRelationshipDiagramPT from './ViewEntityRelationshipDiagramPT';
import { typeColumn } from 'modules/types';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';

const edgeOptions = Object.freeze({
  // animated: true,
  type: 'normal',
  data: {
    sourceRelation: '1',
    targetRelation: '*'
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

const ViewEntityRelationshipDiagramCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeViewEntityRelationshipDiagramCT): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const type = 'entity-relationship'; // Firebase 컬렉션 이름
  const { id } = useParams(); // 다이어그램 id
  const navigate = useNavigate(); // router 제어 훅

  const tableTypes = useMemo(() => ({ table: Table }), []); // 커스텀 테이블 타입들
  const edgeTypes = useMemo(() => ({ normal: NormalEdge }), []); // 커스텀 엣지 타입들

  const [title, setTitle] = useState<string>(''); // 다이어그램 타이틀
  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅

  const [rfInstance, setRfInstance] = useState<any>(null); // 로컬스토리지 일시 저장용 다이어그램 인스턴스
  const [tables, setTables] = useNodesState(initialTables); // 테이블 수정 hook
  const [edges, setEdges] = useEdgesState(initialEdges); // 엣지 수정 hook
  const { setViewport } = useReactFlow();

  // 초기 다이어그램 불러오기
  useEffect(() => {
    try {
      (async () => {
        if (id !== undefined) {
          handleLoaderTrue();

          let docSnap;
          try {
            docSnap = await getDoc(doc(db, type, id));
          } catch (error) {
            console.error(error);
            throw Error('Data Fetching Error');
          }

          if (docSnap !== undefined && docSnap.exists()) {
            const { title, content, isDone, corporate } = docSnap.data();

            if (
              isDone !== 'Y' &&
              (uid === undefined ||
                uid === null ||
                uid === '' ||
                !handleHasPermission(['r'], await handleGetGrade(corporate)))
            ) {
              throw Error('Invalid Detail ID');
            }

            const flow = JSON.parse(content);

            if (flow) {
              const { x = 0, y = 0, zoom = 1 } = flow.viewport;
              setTables(
                [
                  ...flow.nodes.map((node: Node) => {
                    return {
                      ...node,
                      connectable: false,
                      data: {
                        ...node.data,
                        editPossible: false
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
                        editPossible: false
                      }
                    };
                  })
                ] || []
              );
              setViewport({ x, y, zoom });
            }

            setTitle(title);
          } else {
            throw Error('Invalid Detail ID');
          }

          handleLoaderFalse();
        } else {
          throw Error('No Document Detail ID');
        }
      })();
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
      setErrorPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  }, []);

  // 로그인 되어있을 경우 grade 반환 함수
  const handleGetGrade = async (corp?: string) => {
    if (uid !== undefined && uid !== null && uid !== '') {
      const docSnap = await getDoc(doc(db, 'authority', uid));

      if (docSnap !== undefined && docSnap.exists()) {
        const { grade, corporate } = docSnap.data();

        if (corporate === 'ALL' || corporate === corp) return grade;
      }
    }
  };

  // error 팝업 확인 버튼
  const handleErrorPopup = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
    navigate(-1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ViewEntityRelationshipDiagramPT
      title={title}
      tables={tables}
      edges={edges}
      tableTypes={tableTypes}
      edgeTypes={edgeTypes}
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
      onInit={setRfInstance}
      onErrorPopup={handleErrorPopup}
      onBack={handleBack}
    />
  );
};

export default (props: typeViewEntityRelationshipDiagramCT) => (
  <ReactFlowProvider>
    <ViewEntityRelationshipDiagramCT {...props} />
  </ReactFlowProvider>
);

interface typeViewEntityRelationshipDiagramCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}
