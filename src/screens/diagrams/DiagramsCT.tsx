import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DiagramsPT from './DiagramsPT';

const DiagramsCT = (props: typeDiagramsCT): JSX.Element => {
  const { type } = useParams();
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (type !== undefined) {
      if (type === 'sequence') {
        setTitle('Sequence Diagrams');
        //TODO: sequence diagram 불러오기
      } else if (type === 'flow') {
        setTitle('Flow Diagrams');
        //TODO: flow diagram 불러오기
      } else if (type === 'entity-relationship') {
        setTitle('Entity-Relationship Diagrams');
        //TODO: erd diagram 불러오기
      }
    }
  }, []);

  return <DiagramsPT type={type} title={title} />;
};

interface typeDiagramsCT {}

export default DiagramsCT;
