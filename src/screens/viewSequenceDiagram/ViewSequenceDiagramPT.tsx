import React from 'react';
import Sequence from 'react-sequence-diagram';
import styles from './ViewSequenceDiagram.module.scss';

const ViewSequenceDiagramPT = ({
  title,
  content
}: typeViewSequenceDiagramPT): JSX.Element => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.content}>
            <Sequence options={{ theme: 'simple' }} input={content} />
          </div>
        </div>
      </div>
    </>
  );
};

interface typeViewSequenceDiagramPT {
  title: string;
  content: string;
}

export default ViewSequenceDiagramPT;
