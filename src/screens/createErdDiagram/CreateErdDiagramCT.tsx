import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateErdDiagramPT from './CreateErdDiagramPT';

const CreateErdDiagramCT = (props: typeCreateErdDiagramCT): JSX.Element => {
  useEffect(() => {}, []);

  return <CreateErdDiagramPT />;
};

interface typeCreateErdDiagramCT {}

export default CreateErdDiagramCT;
