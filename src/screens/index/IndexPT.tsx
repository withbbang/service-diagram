import React, { useEffect } from 'react';
import styles from './Index.module.scss';

const IndexPT = ({ onNavigate }: typeIndexPT): JSX.Element => {
  return (
    <div className={styles.wrap}>
      <h1>Service Diagrams</h1>
      <div className={styles.buttons}>
        <button onClick={() => onNavigate('sequence')}>
          Sequence Diagrams
        </button>
        <button onClick={() => onNavigate('flow')}>Flow Diagrams</button>
        <button onClick={() => onNavigate('erd')}>
          Entity-Relation Diagrams
        </button>
      </div>
    </div>
  );
};

interface typeIndexPT {
  onNavigate: (type: string) => void;
}

export default IndexPT;
