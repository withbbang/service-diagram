import React, { useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app } from 'modules/utils';
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
          const { title, content, isDone } = docSnap.data();

          if (
            isDone !== 'Y' &&
            (uid === undefined || uid === null || uid === '')
          ) {
            setConfirmMessage('Invalid Detail ID!');
            setConfirmPopupActive(true);
            handleLoaderFalse();
            return;
          }

          setTitle(title);
          setContent(content);
        } else {
          setConfirmMessage('Invalid Detail ID!');
          setConfirmPopupActive(true);
          handleLoaderFalse();
          return;
        }

        handleLoaderFalse();
      } else {
        setConfirmMessage('No Document Detail ID!');
        setConfirmPopupActive(true);
      }
    })();
  }, []);

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
