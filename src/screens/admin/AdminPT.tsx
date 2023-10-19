import React from 'react';
import SVG from 'modules/SVG';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import styles from './Admin.module.scss';

const AdminPT = ({
  uid,
  uid_,
  confirmPopupActive,
  confirmMessage,
  errorPopupActive,
  errorMessage,
  onBack,
  onConfirm,
  onCancel,
  onErrorPopup
}: typeAdminPT): JSX.Element => {
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
      <div className={styles.wrap}>
        <div className={styles.backBtn}>
          <span onClick={onBack}>
            <SVG type="back" width="30px" height="30px" />
          </span>
        </div>
        <h2>Admin</h2>
        <div className={styles.innerWrap}></div>
      </div>
    </>
  );
};

interface typeAdminPT {
  uid?: string;
  uid_: string;
  confirmPopupActive: boolean;
  confirmMessage: string;
  errorPopupActive: boolean;
  errorMessage: string;
  onBack: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onErrorPopup: () => void;
}

export default AdminPT;
