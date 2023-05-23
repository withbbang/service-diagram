import React, { useEffect } from 'react';
import Sequence from 'react-sequence-diagram';
import styles from './CreateSequenceDiagram.module.scss';
import SVG from 'modules/SVG';
import FunctionPopup from 'components/functionPopup/FunctionPopup';

const CreateSequenceDiagramPT = ({
  title,
  content,
  isFunctionPopupActive,
  children,
  onCreateUpdatePopup
}: typeCreateSequenceDiagramPT): JSX.Element => {
  return (
    <>
      <FunctionPopup
        isActive={isFunctionPopupActive}
        children={children}
        onClose={onCreateUpdatePopup}
      />
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.content}>
            <Sequence options={{ theme: 'simple' }} input={content} />
          </div>
          <div className={styles.createUpdateBtn} onClick={onCreateUpdatePopup}>
            <SVG type="modify" width="20px" height="20px" />
          </div>
        </div>
      </div>
    </>
  );
};

interface typeCreateSequenceDiagramPT {
  title: string;
  content: string;
  isFunctionPopupActive: boolean;
  children: JSX.Element;
  onCreateUpdatePopup: () => void;
}

export default CreateSequenceDiagramPT;
