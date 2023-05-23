import React, { useEffect } from 'react';
import styles from './Diagrams.module.scss';

const DiagramsPT = ({ onNavigate }: typeDiagramsPT): JSX.Element => {
  return (
    <div className={styles.wrap}>
      <h1>Diagram Page!</h1>
    </div>
  );
};

interface typeDiagramsPT {
  onNavigate: (type: string) => void;
}

export default DiagramsPT;
