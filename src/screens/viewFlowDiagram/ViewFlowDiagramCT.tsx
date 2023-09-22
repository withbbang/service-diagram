import React, { useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app, handleHasPermission } from 'modules/utils';
import { doc, getDoc } from 'firebase/firestore';
import {
  MarkerType,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from 'reactflow';
import { useNavigate, useParams } from 'react-router-dom';
import DiamondNode from 'components/flow/customNodes/DiamondNode';
import RectangleNode from 'components/flow/customNodes/RectangleNode';
import SelfConnectingEdge from 'components/flow/customEdges/SelfConnectingEdge';
import ViewFlowDiagramPT from './ViewFlowDiagramPT';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';

const nodeTypes = { diamondNode: DiamondNode, rectangleNode: RectangleNode };
const edgeTypes = {
  selfConnectingEdge: SelfConnectingEdge
};
const edgeOptions = {
  // animated: true,
  markerEnd: {
    type: MarkerType.Arrow,
    width: 15,
    height: 15
  }
};

const ViewFlowDiagramCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeViewFlowDiagramCT): JSX.Element => {
  const db = getFirestore(app);
  const type = 'flow';
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  const [rfInstance, setRfInstance] = useState<any>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const { setViewport } = useReactFlow();

  // 초기 다이어그램 불러오기
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
          return handleLoaderFalse();
        }

        if (docSnap !== undefined && docSnap.exists()) {
          const { title, content, isDone } = docSnap.data();

          if (
            isDone !== 'Y' &&
            (uid === undefined ||
              uid === null ||
              uid === '' ||
              !handleHasPermission(['r'], await handleGetGrade()))
          ) {
            setConfirmMessage('Invalid Detail ID!');
            setConfirmPopupActive(true);
            return handleLoaderFalse();
          }

          const flow = JSON.parse(content);

          if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            setNodes(
              flow.nodes.map((node: Node) => {
                const { data, width, height } = node;
                return {
                  ...node,
                  connectable: false,
                  data: { ...data, width, height, editPossible: false }
                };
              }) || []
            );
            setEdges(flow.edges || []);
            setViewport({ x, y, zoom });
          }

          setTitle(title);
        } else {
          setConfirmMessage('Invalid Detail ID!');
          setConfirmPopupActive(true);
        }

        handleLoaderFalse();
      } else {
        setConfirmMessage('No Document Detail ID!');
        setConfirmPopupActive(true);
      }
    })();
  }, []);

  // 로그인 되어있을 경우 grade 반환 함수
  const handleGetGrade = async () => {
    if (uid !== undefined && uid !== null && uid !== '') {
      const docSnap = await getDoc(doc(db, 'authority', uid));

      if (docSnap !== undefined && docSnap.exists()) {
        return docSnap.data().grade;
      }
    }
  };

  // confirm 팝업 확인/취소 버튼
  const handleConfirm = () => {
    navigate(-1);
  };

  return (
    <ViewFlowDiagramPT
      title={title}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onConfirm={handleConfirm}
      onCancel={handleConfirm}
      onInit={setRfInstance}
    />
  );
};

export default (props: typeViewFlowDiagramCT) => (
  <ReactFlowProvider>
    <ViewFlowDiagramCT {...props} />
  </ReactFlowProvider>
);

interface typeViewFlowDiagramCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}
