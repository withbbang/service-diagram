import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DiagramsPT from './DiagramsPT';

const DiagramsCT = (props: typeDiagramsCT): JSX.Element => {
  const { type } = useParams();

  useEffect(() => {
    if (type !== undefined) {
      if (type === 'sequence') {
        //TODO: sequence diagram 불러오기
      } else if (type === 'erd') {
        //TODO: erd diagram 불러오기
      }
    }
  }, []);

  return <DiagramsPT type={type} />;
};

interface typeDiagramsCT {}

export default DiagramsCT;
