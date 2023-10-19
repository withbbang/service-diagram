import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import { SHA256 } from 'crypto-js';
import { app, auth } from 'modules/utils';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue,
  handleSetUserInfo
} from 'middlewares/reduxToolkits/commonSlice';
import Loader from 'components/loader';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import SVG from 'modules/SVG';
import styles from './SignIn.module.scss';

const mapStateToProps = (state: PropState): CommonState => {
  return { ...state.common };
};

const mapDispatchToProps = (dispatch: (actionFunction: Action<any>) => any) => {
  return {
    handleLoaderTrue: (): void => {
      dispatch(handleLoaderTrue());
    },
    handleLoaderFalse: (): void => {
      dispatch(handleLoaderFalse());
    },
    handleSetUserInfo: (payload: {
      uid: string;
      email: string;
      nickname: string;
    }): void => {
      dispatch(handleSetUserInfo(payload));
    }
  };
};

const SignIn = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse,
  handleSetUserInfo
}: typeSignIn): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅

  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      navigate('/', { replace: true });
    }
  }, [uid]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  const handleSignIn = async () => {
    if (!email) {
      setErrorMessage('Empty Email Field');
      setErrorPopupActive(true);
      return;
    }

    if (!password) {
      setErrorMessage('Empty Password Field');
      setErrorPopupActive(true);
      return;
    }

    handleLoaderTrue();

    try {
      const {
        user: { uid }
      } = await handleSignInWithEmailAndPassword(
        handleEncryptPassword(password)
      );

      const nickname = await handleGetUserInfo(uid);

      handleSetUserInfo({ uid, email, nickname });
      navigate('/', { replace: true });
    } catch (error: any) {
      setErrorMessage(error.message);
      setErrorPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

  // 비밀번호 암호화
  const handleEncryptPassword = (password: string) => {
    try {
      return SHA256(password).toString();
    } catch (error) {
      console.error(error);
      throw Error('Password Encrypting Error');
    }
  };

  // 로그인
  const handleSignInWithEmailAndPassword = async (encryptPassword: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, encryptPassword);
    } catch (error) {
      console.error(error);
      throw Error('User Credential Error');
    }
  };

  // 유저 정보 가져오기
  const handleGetUserInfo = async (uid: string) => {
    let docSnap;
    try {
      docSnap = await getDoc(doc(db, 'authority', uid));

      if (!docSnap.exists()) {
        throw Error('No User');
      }

      const { isDeleted, nickname } = docSnap.data();

      if (isDeleted !== 'N') {
        throw Error('Deleted User');
      }

      return nickname;
    } catch (error: any) {
      console.error(error);
      throw Error('User Credential Error');
    }
  };

  // error 팝업 확인 버튼
  const handleErrorPopup = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Loader />
      <ErrorPopup
        isActive={errorPopupActive}
        errorMessage={errorMessage}
        onConfirm={handleErrorPopup}
      />
      <div className={styles.wrap}>
        <div className={styles.backBtn}>
          <span onClick={handleBack}>
            <SVG type="back" width="30px" height="30px" />
          </span>
        </div>
        <div className={styles.innerWrap}>
          <h2>Sign In</h2>
          <div className={styles.inputDiv}>
            <label>Email</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value.trim())}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Password</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value.trim())}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
    </>
  );
};

interface typeSignIn extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
  handleSetUserInfo: (payload: {
    uid: string;
    email: string;
    nickname: string;
  }) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
