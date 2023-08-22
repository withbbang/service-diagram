import React from 'react';
import Mermaid from 'components/mermaid';
import styles from './CreateMermaid.module.scss';
import SVG from 'modules/SVG';
import FunctionPopup from 'components/functionPopup/FunctionPopup';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';

const CreateMermaidPT = ({
  uid,
  uid_,
  title,
  content,
  isFunctionPopupActive,
  children,
  confirmPopupActive,
  confirmMessage,
  onCreateUpdatePopup,
  onSaveBtn,
  onConfirm,
  onCancel
}: typeCreateMermaidPT): JSX.Element => {
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
        onClose={onCreateUpdatePopup}
      />
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          {uid !== undefined &&
          uid !== null &&
          uid !== '' &&
          uid_ !== '' &&
          uid === uid_ ? (
            <button className={styles.saveBtn} onClick={onSaveBtn}>
              Save
            </button>
          ) : (
            ''
          )}
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.content}>
            <Mermaid content={content} />
          </div>
          <div className={styles.createUpdateBtn} onClick={onCreateUpdatePopup}>
            <SVG type="modify" width="20px" height="20px" />
          </div>
        </div>
      </div>
    </>
  );
};

interface typeCreateMermaidPT {
  uid?: string;
  uid_: string;
  title: string;
  content: string;
  isFunctionPopupActive: boolean;
  children: JSX.Element;
  confirmPopupActive: boolean;
  confirmMessage: string;
  onCreateUpdatePopup: () => void;
  onSaveBtn: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default CreateMermaidPT;
