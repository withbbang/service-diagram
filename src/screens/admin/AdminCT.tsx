import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPT from './AdminPT';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'modules/utils';

const AdminCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse,
  handleSetUserInfo
}: typeAdminCT): JSX.Element => {
  const navigate = useNavigate(); // router 제어 훅
  const [uid_, setUid_] = useState<string>(''); // 로그인 여부 판단 훅

  // 로그인 여부 판단 훅
  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      handleLoaderTrue();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid_(user.uid);
        }
        handleLoaderFalse();
      });
    } else {
      setUid_('');
    }
  }, [uid]);

  const handleSignIn = () => {
    navigate('/sign/in');
  };

  const handleSignUp = () => {
    navigate('/sign/up');
  };

  const handleSignOut = () => {
    handleSetUserInfo({ uid: '', email: '', nickname: '' });
  };

  const handleNavigate = (type: string) => {
    type !== undefined && navigate(`diagrams/${type}`);
  };

  return <AdminPT uid={uid} uid_={uid_} />;
};

interface typeAdminCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
  handleSetUserInfo: (payload: {
    uid: string;
    email: string;
    nickname: string;
  }) => void;
}

export default AdminCT;
