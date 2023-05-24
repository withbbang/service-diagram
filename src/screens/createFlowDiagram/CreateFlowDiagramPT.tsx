import React from 'react';
import styles from './CreateFlowDiagram.module.scss';
import Flow from 'components/flow/Flow';

const CreateFlowDiagramPT = ({}: typeCreateFlowDiagramPT): JSX.Element => {
  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        {/* <h2 className={styles.title}>{title}</h2> */}
        <div className={styles.content}>
          {/* <FlowDiagram /> */}
          <Flow />
        </div>
      </div>
    </div>
  );
};

interface typeCreateFlowDiagramPT {}

export default CreateFlowDiagramPT;
