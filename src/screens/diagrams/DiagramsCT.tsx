import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  doc,
  deleteDoc
} from 'firebase/firestore';
import DiagramsPT from './DiagramsPT';
import { app, auth } from 'modules/utils';
import { typeContent } from 'modules/types';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';

const DiagramsCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeDiagramsCT): JSX.Element => {
  const db = getFirestore(app);
  const { type } = useParams();

  const [uid_, setUid_] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<Array<typeContent>>([]);
  const [selectedContentId, setSelectedContentId] = useState<string>('');
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  useEffect(() => {
    (async () => {
      if (type !== undefined) {
        handleGetContents(type);

        if (type === 'sequence') {
          setTitle('Sequence Diagrams');
        } else if (type === 'flow') {
          setTitle('Flow Diagrams');
        } else if (type === 'entity-relationship') {
          setTitle('Entity-Relationship Diagrams');
        }
      }
    })();
  }, [uid_]);

  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      handleLoaderTrue();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid_(user.uid);
        }
        handleLoaderFalse();
      });
    } else {
      setUid_('');
    }
  }, [uid]);

  const handleGetContents = async (type: string) => {
    handleLoaderTrue();
    const q =
      uid !== undefined &&
      uid !== null &&
      uid !== '' &&
      uid_ !== '' &&
      uid === uid_
        ? collection(db, type)
        : query(collection(db, type), where('isDone', '==', 'Y'));
    const querySnapshot = await getDocs(q);
    setContents(
      querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title
        };
      })
    );
    handleLoaderFalse();
  };

  const handleDeleteBtn = async (
    e: React.MouseEvent,
    selectedContentId: string
  ) => {
    e.stopPropagation();
    setSelectedContentId(selectedContentId);
    setConfirmMessage('Really Delete?');
    setConfirmPopupActive(true);
  };

  const handleConfirm = async () => {
    if (type !== undefined) {
      handleLoaderTrue();
      await deleteDoc(doc(db, type, selectedContentId));
      setConfirmMessage('');
      setConfirmPopupActive(false);
      setSelectedContentId('');
      await handleGetContents(type);
      handleLoaderFalse();
    } else {
      setConfirmMessage('No Document Detail Type!');
      setConfirmPopupActive(true);
    }
  };

  const handleCancel = () => {
    setConfirmMessage('');
    setSelectedContentId('');
    setConfirmPopupActive(false);
  };

  return (
    <DiagramsPT
      type={type}
      title={title}
      contents={contents}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onDeleteBtn={handleDeleteBtn}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

interface typeDiagramsCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default DiagramsCT;
