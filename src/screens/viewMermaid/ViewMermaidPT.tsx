import React from 'react';
import Mermaid from 'components/mermaid';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import Loader from 'components/loader';
import styles from './ViewMermaid.module.scss';

const ViewMermaidPT = ({
  title,
  content,
  confirmPopupActive,
  confirmMessage,
  onConfirm,
  onCancel
}: typeViewMermaidPT): JSX.Element => {
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
            <Mermaid content={content} />
          </div>
        </div>
      </div>
    </>
  );
};

interface typeViewMermaidPT {
  title: string;
  content: string;
  confirmPopupActive: boolean;
  confirmMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default ViewMermaidPT;
