import React from 'react';
import styles from './UserManagePopup.module.scss';

const UserManagePopup = ({}: typeUserManagePopup): JSX.Element => {
  return (
    <div className={styles.background}>
      <div className={styles.modalBody}></div>
    </div>
  );
};

interface typeUserManagePopup {}

export default UserManagePopup;
