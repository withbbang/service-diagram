import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue
} from 'middlewares/reduxToolkits/commonSlice';
import styles from './SignUp.module.scss';
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
    }
  };
};

const SignUp = ({
  handleLoaderTrue,
  handleLoaderFalse
}: typeSignUp): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  const handleSignUp = () => {
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/sign/in', { replace: true });
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

interface typeSignUp {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
