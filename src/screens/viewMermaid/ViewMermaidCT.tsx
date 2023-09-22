import React, { useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app, handleHasPermission } from 'modules/utils';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import ViewMermaidPT from './ViewMermaidPT';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';

const ViewMermaidCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeViewMermaidCT): JSX.Element => {
  const db = getFirestore(app);
  const type = 'mermaid';
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(``);
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

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

          setTitle(title);
          setContent(content);
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
    <ViewMermaidPT
      title={title}
      content={content}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onConfirm={handleConfirm}
      onCancel={handleConfirm}
    />
  );
};

interface typeViewMermaidCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default ViewMermaidCT;
