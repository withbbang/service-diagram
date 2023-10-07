import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import { SHA256 } from 'crypto-js';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue
} from 'middlewares/reduxToolkits/commonSlice';
import Loader from 'components/loader';
import SVG from 'modules/SVG';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import { app, auth } from 'modules/utils';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';

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
    }
  };
};

const SignUp = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeSignUp): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const type = 'authority'; // Firebase 컬렉션 이름

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
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
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

    let encryptPassword;
    try {
      encryptPassword = SHA256(password).toString();
    } catch (error) {
      console.error(error);
      setErrorMessage('Password Encrypting Error');
      setErrorPopupActive(true);
      return;
    } finally {
      handleLoaderFalse();
    }

    try {
      const {
        user: { uid }
      } = await createUserWithEmailAndPassword(auth, email, encryptPassword);

      await setDoc(doc(db, type, uid), {
        grade: 20
      });

      navigate('/sign/in', { replace: true });
    } catch (error) {
      console.error(error);
      setErrorMessage('User Credential Error');
      setErrorPopupActive(true);
      return;
    } finally {
      handleLoaderFalse();
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
          <h2>Sign Up</h2>
          <div className={styles.inputDiv}>
            <label>Email:</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Password:</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </>
  );
};

interface typeSignUp extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
