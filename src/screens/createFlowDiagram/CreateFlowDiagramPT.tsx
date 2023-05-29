import React from 'react';
import Flow from 'components/flow';
import Loader from 'components/loader';
import styles from './CreateFlowDiagram.module.scss';

const CreateFlowDiagramPT = ({}: typeCreateFlowDiagramPT): JSX.Element => {
  return (
    <>
      <Loader />
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <div className={styles.content}>
            <Flow />
          </div>
        </div>
      </div>
    </>
  );
};

interface typeCreateFlowDiagramPT {}

export default CreateFlowDiagramPT;
