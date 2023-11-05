import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { auth, app } from 'modules/utils';
import IndexPT from './IndexPT';

const IndexCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse,
  handleSetUserInfo
}: typeIndexCT): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체

  const navigate = useNavigate(); // router 제어 훅
  const [uid_, setUid_] = useState<string>(''); // 로그인 여부 판단 훅
  const [grade, setGrade] = useState<number>(20); // 유저 등급

  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅

  // 로그인 여부 판단 훅
  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      handleCheckAuthStateChanged();
    } else {
      setUid_('');
    }
  }, [uid]);

  const handleCheckAuthStateChanged = () => {
    handleLoaderTrue();
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docSnap = await getDoc(doc(db, 'authority', user.uid));

          if (docSnap !== undefined && docSnap.exists()) {
            const { grade } = docSnap.data();

            setGrade(grade);
          }

          setUid_(user.uid);
        }
      } catch (error: any) {
        setUid_('');
        setGrade(20);
      } finally {
        handleLoaderFalse();
      }
    });
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
    handleLoaderTrue();
    try {
      signOut(auth);
      setGrade(20);
      handleSetUserInfo({ uid: '', email: '', nickname: '' });
    } catch (error) {
      console.error(error);
      setErrorMessage('Sign Out Error');
      setErrorPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

  const handleNavigate = (type: string) => {
    if (type !== undefined && type !== 'admin') navigate(`diagrams/${type}`);
    else navigate(`/${type}`);
  };

  const handleErrorPopup = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
    navigate(-1);
  };

  const handleTestErrorReport = () => {
    try {
      throw new Error('Test Error Report!!!');
    } catch (err) {
      Sentry.captureException('Test Error Report!!!');
    }
  };

  return (
    <IndexPT
      uid={uid}
      uid_={uid_}
      grade={grade}
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
      onSearch={handleSearch}
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
      onSignOut={handleSignOut}
      onNavigate={handleNavigate}
      onErrorPopup={handleErrorPopup}
      onTestErrorReport={handleTestErrorReport}
    />
  );
};

interface typeIndexCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
  handleSetUserInfo: (payload: {
    uid: string;
    email: string;
    nickname: string;
  }) => void;
}

export default IndexCT;
