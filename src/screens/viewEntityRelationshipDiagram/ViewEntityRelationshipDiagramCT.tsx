import React, { useEffect, useMemo, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app } from 'modules/utils';
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
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  const [rfInstance, setRfInstance] = useState<any>(null); // 로컬스토리지 일시 저장용 다이어그램 인스턴스
  const [tables, setTables] = useNodesState(initialTables); // 테이블 수정 hook
  const [edges, setEdges] = useEdgesState(initialEdges); // 엣지 수정 hook
  const { setViewport } = useReactFlow();

  // 다이어그램 초기 불러오기
  useEffect(() => {
    (async () => {
      if (id !== undefined) {
        handleLoaderTrue();

        let docSnap;
        try {
          docSnap = await getDoc(doc(db, type, id));
        } catch (error) {
          console.error(error);
          setConfirmMessage('Data Fetching Error');
          setConfirmPopupActive(true);
        }

        if (docSnap !== undefined && docSnap.exists()) {
          const { title, content } = docSnap.data();

          const flow = JSON.parse(content);

          if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            setTables(
              [
                ...flow.nodes.map((node: Node) => {
                  return {
                    ...node,
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
        }

        handleLoaderFalse();
      } else {
        setConfirmMessage('No Document Detail ID!');
        setConfirmPopupActive(true);
      }
    })();
  }, []);

  // confirm 팝업 확인/취소 버튼
  const handleConfirm = () => {
    navigate(-1);
  };

  return (
    <ViewEntityRelationshipDiagramPT
      title={title}
      tables={tables}
      edges={edges}
      tableTypes={tableTypes}
      edgeTypes={edgeTypes}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onConfirm={handleConfirm}
      onCancel={handleConfirm}
      onInit={setRfInstance}
    />
  );
};

export default (props: typeViewEntityRelationshipDiagramCT) => (
  <ReactFlowProvider>
    <ViewEntityRelationshipDiagramCT {...props} />
  </ReactFlowProvider>
);

interface typeViewEntityRelationshipDiagramCT {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}
