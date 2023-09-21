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
import styles from './SignUp.module.scss';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import { app, auth } from 'modules/utils';
import { useNavigate } from 'react-router-dom';

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
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>('');

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
      setConfirmMessage('Empty Email Field');
      setConfirmPopupActive(true);
      return;
    }

    if (!password) {
      setConfirmMessage('Empty Password Field');
      setConfirmPopupActive(true);
      return;
    }

    handleLoaderTrue();

    let encryptPassword;
    try {
      encryptPassword = SHA256(password).toString();
    } catch (error) {
      console.error(error);
      setConfirmMessage('Password Encrypting Error');
      setConfirmPopupActive(true);
      return handleLoaderFalse();
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
      setConfirmMessage('User Credential Error');
      setConfirmPopupActive(true);
      return;
    } finally {
      handleLoaderFalse();
    }
  };

  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  return (
    <>
      <Loader />
      <ConfirmPopup
        isActive={confirmPopupActive}
        confirmMessage={confirmMessage}
        confirmType=""
        onConfirm={handleCancel}
        onCancel={handleCancel}
      />
      <div className={styles.wrap}>
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
