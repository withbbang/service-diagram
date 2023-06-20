import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue,
  handleSetUid
} from 'middlewares/reduxToolkits/commonSlice';
import styles from './SignIn.module.scss';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import { auth } from 'modules/utils';
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
    }
  };
};

const SignIn = ({
  handleLoaderTrue,
  handleLoaderFalse,
  handleSetUid
}: typeSignIn): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  const handleSignIn = () => {
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        handleSetUid(userCredential.user.uid);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        setConfirmMessage(error.message);
        setConfirmPopupActive(true);
      })
      .finally(() => handleLoaderFalse());
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

interface typeSignIn {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
  handleSetUid: (uid: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
