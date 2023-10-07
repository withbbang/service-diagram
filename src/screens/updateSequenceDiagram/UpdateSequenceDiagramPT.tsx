import React from 'react';
import Sequence from 'react-sequence-diagram';
import styles from './UpdateSequenceDiagram.module.scss';
import SVG from 'modules/SVG';
import FunctionPopup from 'components/functionPopup/FunctionPopup';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';

const UpdateSequenceDiagramPT = ({
  uid,
  uid_,
  title,
  content,
  isFunctionPopupActive,
  children,
  confirmPopupActive,
  confirmMessage,
  errorPopupActive,
  errorMessage,
  onUpdatePopup,
  onUpdateBtn,
  onConfirm,
  onCancel,
  onErrorPopup,
  onBack
}: typeUpdateSequenceDiagramPT): JSX.Element => {
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
      <ErrorPopup
        isActive={errorPopupActive}
        errorMessage={errorMessage}
        onConfirm={onErrorPopup}
      />
      <FunctionPopup
        isActive={isFunctionPopupActive}
        children={children}
        onClose={onUpdatePopup}
      />
      <div className={styles.wrap}>
        <div className={styles.backBtn}>
          <span onClick={onBack}>
            <SVG type="back" width="30px" height="30px" />
          </span>
        </div>
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
            <Sequence options={{ theme: 'simple' }} input={content} />
          </div>
          <div className={styles.createUpdateBtn} onClick={onUpdatePopup}>
            <SVG type="modify" width="20px" height="20px" />
          </div>
        </div>
      </div>
    </>
  );
};

interface typeUpdateSequenceDiagramPT {
  uid?: string;
  uid_: string;
  title: string;
  content: string;
  isFunctionPopupActive: boolean;
  children: JSX.Element;
  confirmPopupActive: boolean;
  confirmMessage: string;
  errorPopupActive: boolean;
  errorMessage: string;
  onUpdatePopup: () => void;
  onUpdateBtn: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onErrorPopup: () => void;
  onBack: () => void;
}

export default UpdateSequenceDiagramPT;
