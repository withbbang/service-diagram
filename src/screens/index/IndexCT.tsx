import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IndexPT from './IndexPT';

const IndexCT = (props: typeIndexCT): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleNavigate = (type: string) => {
    navigate('/diagram/' + type);
  };

  return <IndexPT onNavigate={handleNavigate} />;
};

interface typeIndexCT {}

export default IndexCT;
