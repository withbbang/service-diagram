import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IndexPT from './IndexPT';

const IndexCT = (props: typeIndexCT): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleNavigate = (type: string) => {
    type !== undefined
      ? navigate(`diagrams/${type}`)
      : alert('Type 정의 오류!');
  };

  return <IndexPT onNavigate={handleNavigate} />;
};

interface typeIndexCT {}

export default IndexCT;
