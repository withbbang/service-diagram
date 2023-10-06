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
  const [corporate, setCorporate] = useState<string>(''); // 유저 기업
  const [title, setTitle] = useState<string>(''); // 선택한 다이어그램에 따른 제목
  const [contents, setContents] = useState<Array<typeContent>>([]); // 선택한 다이어그램들 배열 훅
  const [selectedContentId, setSelectedContentId] = useState<string>(''); // 다어그램들 중 선택한 놈 id
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅
  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅

  // 선택된 다이어그램에 따라 title 설정 및 다이어그램들 가져오기
  useEffect(() => {
    handleSetTitle();
  }, []);

  useEffect(() => {
    type && handleGetContents(type);
  }, [grade, corporate]);

  // 로그인 여부 판단 훅
  useEffect(() => {
    try {
      if (uid !== undefined && uid !== null && uid !== '') {
        handleLoaderTrue();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUid_(user.uid);
            const docSnap = await getDoc(doc(db, 'authority', user.uid));

            if (docSnap !== undefined && docSnap.exists()) {
              const { grade, corporate } = docSnap.data();

              setGrade(grade);
              setCorporate(corporate);
            }
          }
        });
      }
    } catch (error: any) {
      setUid_('');
      setGrade(20);
    } finally {
      handleLoaderFalse();
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
        handleHasPermission(['r'], grade) // 로그인 O
          ? corporate === 'ALL'
            ? query(collection(db, type), orderBy('createDt', 'desc')) // 전체 보기
            : query(
                collection(db, type),
                where('corporate', 'in', ['ALL', corporate]),
                orderBy('createDt', 'desc')
              ) // 특정 기업만 보기
          : query(
              collection(db, type),
              where('isDone', '==', 'Y'),
              orderBy('createDt', 'desc')
            ); // 로그인 X
      const querySnapshot = await getDocs(q);

      setContents(
        querySnapshot.docs.map((doc) => {
          const { title, corporate, createDt } = doc.data();

          return {
            id: doc.id,
            corporate,
            title,
            createDt: handleConvertTimestamp(createDt.toDate(), 'date')
          };
        })
      );
    } catch (error) {
      console.error(error);
      setErrorMessage('Data Fetching Error');
      setErrorPopupActive(true);
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
    try {
      handleLoaderTrue();
      if (type !== undefined) {
        await deleteDoc(doc(db, type, selectedContentId));
        setConfirmMessage('');
        setConfirmPopupActive(false);
        setSelectedContentId('');
        await handleGetContents(type);
      } else {
        setErrorMessage('No Document Detail Type');
        setErrorPopupActive(true);
      }
    } catch (error: any) {
      setErrorMessage('Data Deleting Error');
      setErrorPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

  // confirm 팝업 취소 버튼
  const handleCancel = () => {
    setConfirmMessage('');
    setSelectedContentId('');
    setConfirmPopupActive(false);
  };

  // error 팝업 확인 버튼
  const handleErrorPopup = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
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
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
      onSearch={handleSearch}
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
      onSignOut={handleSignOut}
      onDeleteBtn={handleDeleteBtn}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onErrorPopup={handleErrorPopup}
    />
  );
};

interface typeDiagramsCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
  handleSetUid: (uid: string) => void;
}

export default DiagramsCT;
