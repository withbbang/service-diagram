import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagramsPT from './DiagramsPT';

const DiagramsCT = (props: typeDiagramsCT): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleNavigate = (type: string) => {
    navigate('/diagram/' + type);
  };

  return <DiagramsPT onNavigate={handleNavigate} />;
};

interface typeDiagramsCT {}

export default DiagramsCT;
