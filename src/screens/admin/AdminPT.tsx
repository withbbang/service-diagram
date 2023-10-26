import React from 'react';
import SVG from 'modules/SVG';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import { handleHasPermission } from 'modules/utils';
import styles from './Admin.module.scss';
import { typeAuthority } from 'modules/types';
import UserCard from 'components/userCard/UserCard';

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
              <div className={styles.innerWrap}>
                {Array.isArray(users) &&
                  users.length > 0 &&
                  users.map((user: typeAuthority, idx) => (
                    <UserCard
                      key={idx}
                      id={user.id}
                      company={user.company}
                      createDt={user.createDt}
                      deleteDt={user.deleteDt}
                      userEmail={user.email}
                      grade={user.grade}
                      isDeleted={user.isDeleted}
                      userNickname={user.nickname}
                    />
                  ))}
              </div>
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
