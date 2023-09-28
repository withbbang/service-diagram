import React from 'react';
import Mermaid from 'components/mermaid';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import Loader from 'components/loader';
import styles from './ViewMermaid.module.scss';

const ViewMermaidPT = ({
  title,
  content,
  errorPopupActive,
  errorMessage,
  onErrorPopup
}: typeViewMermaidPT): JSX.Element => {
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
  errorPopupActive: boolean;
  errorMessage: string;
  onErrorPopup: () => void;
}

export default ViewMermaidPT;
