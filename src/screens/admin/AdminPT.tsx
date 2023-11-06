import React from 'react';
import SVG from 'modules/SVG';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import { handleHasPermission } from 'modules/utils';
import styles from './Admin.module.scss';
import { typeAuthority } from 'modules/types';
import UserCard from 'components/userCard/UserCard';
import UserManagePopup from 'components/userManagePopup/UserManagePopup';

const AdminPT = ({
  xPos,
  yPos,
  uid,
  uid_,
  grade,
  newGrade,
  selectedUserId,
  users,
  confirmPopupActive,
  confirmMessage,
  errorPopupActive,
  errorMessage,
  userManagePopupActive,
  onBack,
  onConfirm,
  onCancel,
  onErrorPopup,
  onClickCard,
  onSetNewGrade,
  onUpdateBtn
}: typeAdminPT): JSX.Element => {
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
      <UserManagePopup
        xPos={xPos}
        yPos={yPos}
        isActive={userManagePopupActive}
        newGrade={newGrade}
        user={users.filter((user) => user.id === selectedUserId)[0]}
        onClick={onClickCard}
        onSetNewGrade={onSetNewGrade}
        onUpdateBtn={onUpdateBtn}
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
                      onClickCard={onClickCard}
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
  xPos?: number;
  yPos?: number;
  uid?: string;
  uid_: string;
  grade?: number;
  newGrade: number;
  selectedUserId?: string;
  users: Array<typeAuthority>;
  confirmPopupActive: boolean;
  confirmMessage: string;
  errorPopupActive: boolean;
  errorMessage: string;
  userManagePopupActive: boolean;
  onBack: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onErrorPopup: () => void;
  onClickCard: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id?: string
  ) => void;
  onSetNewGrade: React.Dispatch<React.SetStateAction<number>>;
  onUpdateBtn: () => void;
}

export default AdminPT;
