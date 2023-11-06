import React from 'react';
import Sequence from 'react-sequence-diagram';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import SVG from 'modules/SVG';
import styles from './ViewSequenceDiagram.module.scss';

const ViewSequenceDiagramPT = ({
  title,
  content,
  errorPopupActive,
  errorMessage,
  onErrorPopup,
  onBack
}: typeViewSequenceDiagramPT): JSX.Element => {
  return (
    <>
      <ErrorPopup
        isActive={errorPopupActive}
        errorMessage={errorMessage}
        onConfirm={onErrorPopup}
      />
      <div className={styles.wrap}>
        <div className={styles.backBtn}>
          <span onClick={onBack}>
            <SVG type="back" width="30px" height="30px" />
          </span>
        </div>
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
  errorPopupActive: boolean;
  errorMessage: string;
  onErrorPopup: () => void;
  onBack: () => void;
}

export default ViewSequenceDiagramPT;
