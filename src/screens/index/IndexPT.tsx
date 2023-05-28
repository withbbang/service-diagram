import React, { useEffect } from 'react';
import Loader from 'components/loader';
import styles from './Index.module.scss';

const IndexPT = ({ onNavigate }: typeIndexPT): JSX.Element => {
  return (
    <>
      <Loader />
      <div className={styles.wrap}>
        <h1>Service Diagrams</h1>
        <div className={styles.buttons}>
          <button onClick={() => onNavigate('sequence')}>
            Sequence Diagrams
          </button>
          <button onClick={() => onNavigate('flow')}>Flow Diagrams</button>
          <button onClick={() => onNavigate('entity-relationship')}>
            Entity-Relationship Diagrams
          </button>
        </div>
      </div>
    </>
  );
};

interface typeIndexPT {
  onNavigate: (type: string) => void;
}

export default IndexPT;
