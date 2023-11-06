import React from 'react';
import Sequence from 'react-sequence-diagram';
import styles from './CreateSequenceDiagram.module.scss';
import SVG from 'modules/SVG';
import FunctionPopup from 'components/functionPopup/FunctionPopup';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import { handleHasPermission } from 'modules/utils';

const CreateSequenceDiagramPT = ({
  grade,
  title,
  content,
  isFunctionPopupActive,
  children,
  confirmPopupActive,
  confirmMessage,
  errorPopupActive,
  errorMessage,
  onCreateUpdatePopup,
  onSaveBtn,
  onConfirm,
  onCancel,
  onErrorPopup,
  onBack
}: typeCreateSequenceDiagramPT): JSX.Element => {
  return (
    <>
      <ConfirmPopup
        isActive={confirmPopupActive}
        confirmMessage={confirmMessage}
        confirmType=""
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <ErrorPopup
        isActive={errorPopupActive}
        errorMessage={errorMessage}
        onConfirm={onErrorPopup}
      />
      <FunctionPopup
        isActive={isFunctionPopupActive}
        children={children}
        onClose={onCreateUpdatePopup}
      />
      <div className={styles.wrap}>
        <div className={styles.backBtn}>
          <span onClick={onBack}>
            <SVG type="back" width="30px" height="30px" />
          </span>
        </div>
        <div className={styles.innerWrap}>
          {handleHasPermission('c', grade) ? (
            <button className={styles.saveBtn} onClick={onSaveBtn}>
              Save
            </button>
          ) : (
            ''
          )}
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
  grade?: number;
  title: string;
  content: string;
  isFunctionPopupActive: boolean;
  children: JSX.Element;
  confirmPopupActive: boolean;
  confirmMessage: string;
  errorPopupActive: boolean;
  errorMessage: string;
  onCreateUpdatePopup: () => void;
  onSaveBtn: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onErrorPopup: () => void;
  onBack: () => void;
}

export default CreateSequenceDiagramPT;
