import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  doc,
  setDoc,
  getFirestore,
  serverTimestamp,
  getDoc
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
  const [nickname, setNickname] = useState<string>('');
  const [company, setCompany] = useState<string>('');
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

    if (!nickname) {
      setErrorMessage('Empty Nickname Field');
      setErrorPopupActive(true);
      return;
    }

    if (!company) {
      setErrorMessage('Empty Company Field');
      setErrorPopupActive(true);
      return;
    }

    handleLoaderTrue();

    try {
      const encryptPassword = handleEncryptPassword(password);
      await handleVerifyCompany();
      await handleCreateUser(encryptPassword);
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

  // 회사 이름 검수
  const handleVerifyCompany = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'company', company));

      if (!docSnap.exists())
        await setDoc(doc(db, 'company', company), {
          name: company
        });
    } catch (error) {
      console.error(error);
      throw Error('Company Setting Error');
    }
  };

  // 유저 생성
  const handleCreateUser = async (encryptPassword: string) => {
    try {
      const {
        user: { uid }
      } = await createUserWithEmailAndPassword(auth, email, encryptPassword);

      await setDoc(doc(db, type, uid), {
        company,
        createDt: serverTimestamp(),
        isDeleted: 'N',
        email,
        grade: 20,
        nickname
      });

      navigate('/sign/in', { replace: true });
    } catch (error) {
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
          <div className={styles.inputDiv}>
            <label>Nickname</label>
            <input
              value={nickname}
              type="text"
              onChange={(e) => setNickname(e.target.value.trim())}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Company</label>
            <input
              value={company}
              type="text"
              onChange={(e) => setCompany(e.target.value.trim())}
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
