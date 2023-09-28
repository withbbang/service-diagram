import React from 'react';
import Sequence from 'react-sequence-diagram';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import Loader from 'components/loader';
import styles from './ViewSequenceDiagram.module.scss';

const ViewSequenceDiagramPT = ({
  title,
  content,
  errorPopupActive,
  errorMessage,
  onErrorPopup
}: typeViewSequenceDiagramPT): JSX.Element => {
  return (
    <>
      <Loader />
      <ErrorPopup
        isActive={errorPopupActive}
        errorMessage={errorMessage}
        onConfirm={onErrorPopup}
      />
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
  errorPopupActive: boolean;
  errorMessage: string;
  onErrorPopup: () => void;
}

export default ViewSequenceDiagramPT;
