import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  doc,
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import DiagramsPT from './DiagramsPT';
import {
  app,
  auth,
  handleConvertTimestamp,
  handleHasPermission
} from 'modules/utils';
import { typeContent } from 'modules/types';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';

const DiagramsCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse,
  handleSetUid
}: typeDiagramsCT): JSX.Element => {
  const navigate = useNavigate(); // router 제어 훅
  const db = getFirestore(app); // Firebase 객체
  const { type } = useParams(); // 다이어그램 타입

  const [uid_, setUid_] = useState<string>(''); // 로그인 여부 판단 훅
  const [grade, setGrade] = useState<number>(20); // 유저 등급
  const [title, setTitle] = useState<string>(''); // 선택한 다이어그램에 따른 제목
  const [contents, setContents] = useState<Array<typeContent>>([]); // 선택한 다이어그램들 배열 훅
  const [selectedContentId, setSelectedContentId] = useState<string>(''); // 다어그램들 중 선택한 놈 id
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  // 선택된 다이어그램에 따라 title 설정 및 다이어그램들 가져오기
  useEffect(() => {
    handleSetTitle();
  }, []);

  useEffect(() => {
    type && handleGetContents(type);
  }, [grade]);

  // 로그인 여부 판단 훅
  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      handleLoaderTrue();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUid_(user.uid);
          const docSnap = await getDoc(doc(db, 'authority', user.uid));

          if (docSnap !== undefined && docSnap.exists()) {
            setGrade(docSnap.data().grade);
          } else {
            setConfirmMessage('Nothing User Grade');
            setConfirmPopupActive(true);
          }
        }

        handleLoaderFalse();
      });
    } else {
      setUid_('');
      setGrade(20);
    }
  }, [uid]);

  // 로그인 여부에 따른 다이어그램들 가져오기
  const handleGetContents = async (type: string) => {
    handleLoaderTrue();

    try {
      const q =
        uid !== undefined &&
        uid !== null &&
        uid !== '' &&
        uid_ !== '' &&
        uid === uid_ &&
        handleHasPermission(['r'], grade)
          ? query(collection(db, type), orderBy('createDt', 'desc')) // 로그인 O
          : query(
              collection(db, type),
              where('isDone', '==', 'Y'),
              orderBy('createDt', 'desc')
            ); // 로그인 X
      const querySnapshot = await getDocs(q);

      setContents(
        querySnapshot.docs.map((doc) => {
          const { title, createDt } = doc.data();

          return {
            id: doc.id,
            title,
            createDt: handleConvertTimestamp(createDt.toDate(), 'date')
          };
        })
      );
    } catch (error) {
      console.error(error);
      setConfirmMessage('Data Fetching Error');
      setConfirmPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

  const handleSetTitle = () => {
    if (type !== undefined) {
      if (type === 'sequence') {
        setTitle('Sequence Diagrams');
      } else if (type === 'flow') {
        setTitle('Flow Diagrams');
      } else if (type === 'entity-relationship') {
        setTitle('Entity-Relationship Diagrams');
      } else if (type === 'mermaid') {
        setTitle('Mermaid');
      }
    }
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const handleSignIn = () => {
    navigate('/sign/in');
  };

  const handleSignUp = () => {
    navigate('/sign/up');
  };

  const handleSignOut = () => {
    handleSetUid('');
  };

  // 삭제 버튼
  const handleDeleteBtn = async (
    e: React.MouseEvent,
    selectedContentId: string
  ) => {
    e.stopPropagation();
    setSelectedContentId(selectedContentId);
    setConfirmMessage('Really Delete?');
    setConfirmPopupActive(true);
  };

  // confirm 팝업 확인 버튼
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

  // confirm 팝업 취소 버튼
  const handleCancel = () => {
    setConfirmMessage('');
    setSelectedContentId('');
    setConfirmPopupActive(false);
  };

  return (
    <DiagramsPT
      uid={uid}
      uid_={uid_}
      grade={grade}
      type={type}
      title={title}
      contents={contents}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onSearch={handleSearch}
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
      onSignOut={handleSignOut}
      onDeleteBtn={handleDeleteBtn}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

interface typeDiagramsCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
  handleSetUid: (uid: string) => void;
}

export default DiagramsCT;
