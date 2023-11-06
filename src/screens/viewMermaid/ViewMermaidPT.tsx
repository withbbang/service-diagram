import React from 'react';
import Mermaid from 'components/mermaid';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import SVG from 'modules/SVG';
import styles from './ViewMermaid.module.scss';

const ViewMermaidPT = ({
  title,
  content,
  errorPopupActive,
  errorMessage,
  onErrorPopup,
  onBack
}: typeViewMermaidPT): JSX.Element => {
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
  onBack: () => void;
}

export default ViewMermaidPT;
