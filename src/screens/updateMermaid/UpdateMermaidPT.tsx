import React from 'react';
import Mermaid from 'components/mermaid';
import styles from './UpdateMermaid.module.scss';
import SVG from 'modules/SVG';
import FunctionPopup from 'components/functionPopup/FunctionPopup';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';

const UpdateMermaidPT = ({
  uid,
  uid_,
  title,
  content,
  isFunctionPopupActive,
  children,
  confirmPopupActive,
  confirmMessage,
  onUpdatePopup,
  onUpdateBtn,
  onConfirm,
  onCancel
}: typeUpdateMermaidPT): JSX.Element => {
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
      <FunctionPopup
        isActive={isFunctionPopupActive}
        children={children}
        onClose={onUpdatePopup}
      />
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          {uid !== undefined &&
          uid !== null &&
          uid !== '' &&
          uid_ !== '' &&
          uid === uid_ ? (
            <button className={styles.updateBtn} onClick={onUpdateBtn}>
              Update
            </button>
          ) : (
            ''
          )}
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.content}>
            <Mermaid content={content} />
          </div>
          <div className={styles.createUpdateBtn} onClick={onUpdatePopup}>
            <SVG type="modify" width="20px" height="20px" />
          </div>
        </div>
      </div>
    </>
  );
};

interface typeUpdateMermaidPT {
  uid?: string;
  uid_: string;
  title: string;
  content: string;
  isFunctionPopupActive: boolean;
  children: JSX.Element;
  confirmPopupActive: boolean;
  confirmMessage: string;
  onUpdatePopup: () => void;
  onUpdateBtn: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default UpdateMermaidPT;
