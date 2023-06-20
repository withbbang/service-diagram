import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IndexPT from './IndexPT';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'modules/utils';

const IndexCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse,
  handleSetUid
}: typeIndexCT): JSX.Element => {
  const navigate = useNavigate();
  const [uid_, setUid_] = useState<string>('');

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
    handleSetUid('');
  };

  const handleNavigate = (type: string) => {
    type !== undefined
      ? navigate(`diagrams/${type}`)
      : alert('Type 정의 오류!');
  };

  return (
    <IndexPT
      uid={uid}
      uid_={uid_}
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
      onSignOut={handleSignOut}
      onNavigate={handleNavigate}
    />
  );
};

interface typeIndexCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
  handleSetUid: (uid: string) => void;
}

export default IndexCT;
