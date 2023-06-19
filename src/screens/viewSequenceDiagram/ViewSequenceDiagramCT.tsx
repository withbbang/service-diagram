import React, { useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app } from 'modules/utils';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import ViewSequenceDiagramPT from './ViewSequenceDiagramPT';

const ViewSequenceDiagramCT = ({
  handleLoaderTrue,
  handleLoaderFalse
}: typeViewSequenceDiagramCT): JSX.Element => {
  const db = getFirestore(app);
  const type = 'sequence';
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(``);
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  useEffect(() => {
    (async () => {
      handleLoaderTrue();
      if (id !== undefined) {
        const docRef = doc(db, type, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { title, content } = docSnap.data();

          console.log(docSnap.data());

          setTitle(title);
          setContent(content);
        }
      } else {
        setConfirmMessage('No Document Detail ID!');
        setConfirmPopupActive(true);
      }
      handleLoaderFalse();
    })();
  }, []);

  const handleConfirm = () => {
    navigate(-1);
  };

  return (
    <ViewSequenceDiagramPT
      title={title}
      content={content}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onConfirm={handleConfirm}
      onCancel={handleConfirm}
    />
  );
};

interface typeViewSequenceDiagramCT {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default ViewSequenceDiagramCT;
