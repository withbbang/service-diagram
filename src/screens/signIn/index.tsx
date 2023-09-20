import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import { SHA256 } from 'crypto-js';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue,
  handleSetUid,
  handleSetGrade
} from 'middlewares/reduxToolkits/commonSlice';
import styles from './SignIn.module.scss';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import { auth, app } from 'modules/utils';
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
    },
    handleSetUid: (uid: string): void => {
      dispatch(handleSetUid({ uid }));
    },
    handleSetGrade: (grade: number): void => {
      dispatch(handleSetGrade({ grade }));
    }
  };
};

const SignIn = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse,
  handleSetUid,
  handleSetGrade
}: typeSignIn): JSX.Element => {
  const navigate = useNavigate();

  const db = getFirestore(app);
  const type = 'authority';
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
      handleSignIn();
    }
  };

  const handleSignIn = async () => {
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
      handleLoaderFalse();
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        encryptPassword
      );

      const uid = userCredential.user.uid;
      handleSetUid(uid);

      const docSnap = await getDoc(doc(db, type, uid));

      if (docSnap !== undefined && docSnap.exists()) {
        const { grade } = docSnap.data();
        handleSetGrade(grade);
      } else {
        setConfirmMessage('Nothing User Grade');
        setConfirmPopupActive(true);
        return;
      }

      navigate('/', { replace: true });
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
          <h2>Sign In</h2>
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
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
    </>
  );
};

interface typeSignIn extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
  handleSetUid: (uid: string) => void;
  handleSetGrade: (grade: number) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
