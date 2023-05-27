import React from 'react';
import styles from './CreateFlowDiagram.module.scss';
import Flow from 'components/flow';

const CreateFlowDiagramPT = ({}: typeCreateFlowDiagramPT): JSX.Element => {
  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <div className={styles.content}>
          <Flow />
        </div>
      </div>
    </div>
  );
};

interface typeCreateFlowDiagramPT {}

export default CreateFlowDiagramPT;
