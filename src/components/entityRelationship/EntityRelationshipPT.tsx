import React, { useEffect } from 'react';
import ReactFlow from 'reactflow';
import styles from './EntityRelationship.module.scss';

const EntityRelationshipPT = ({}: typeEntityRelationshipPT): JSX.Element => {
  return (
    <>
      <div className={styles.wrap}>
        <ReactFlow />
      </div>
    </>
  );
};

interface typeEntityRelationshipPT {}

export default EntityRelationshipPT;
