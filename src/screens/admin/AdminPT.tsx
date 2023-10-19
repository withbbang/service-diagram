import React from 'react';
import SVG from 'modules/SVG';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import { handleHasPermission } from 'modules/utils';
import styles from './Admin.module.scss';
import { typeAuthority } from 'modules/types';

const AdminPT = ({
  uid,
  uid_,
  grade,
  users,
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
        {uid !== undefined &&
          uid !== null &&
          uid !== '' &&
          uid_ !== '' &&
          uid === uid_ &&
          handleHasPermission('m', grade) && (
            <>
              <h2>Admin</h2>
              <div className={styles.innerWrap}></div>
            </>
          )}
      </div>
    </>
  );
};

interface typeAdminPT {
  uid?: string;
  uid_: string;
  grade?: number;
  users: Array<typeAuthority>;
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
