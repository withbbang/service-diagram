import React from 'react';
import Sequence from 'react-sequence-diagram';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import Loader from 'components/loader';
import styles from './ViewSequenceDiagram.module.scss';

const ViewSequenceDiagramPT = ({
  title,
  content,
  confirmPopupActive,
  confirmMessage,
  onConfirm,
  onCancel
}: typeViewSequenceDiagramPT): JSX.Element => {
  return (
    <>
      <Loader />
      <ConfirmPopup
        isActive={confirmPopupActive}
        confirmMessage={confirmMessage}
        confirmType=""
        onConfirm={onConfirm}
        onCancel={onCancel}
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
  confirmPopupActive: boolean;
  confirmMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default ViewSequenceDiagramPT;
