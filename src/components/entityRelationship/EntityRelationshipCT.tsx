import React, { useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import EntityRelationshipPT from './EntityRelationshipPT';

const EntityRelationshipCT = (props: typeEntityRelationshipCT): JSX.Element => {
  useEffect(() => {}, []);

  return <EntityRelationshipPT />;
};

export default (props: typeEntityRelationshipCT) => (
  <ReactFlowProvider>
    <EntityRelationshipCT {...props} />
  </ReactFlowProvider>
);

interface typeEntityRelationshipCT {}
