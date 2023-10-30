import React, { useEffect, useRef } from 'react';
import styles from './UserManagePopup.module.scss';

const UserManagePopup = ({
  isActive,
  xPos,
  yPos,
  onClick
}: typeUserManagePopup): JSX.Element => {
  const ref = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;

  useEffect(() => {
    handleMount();

    return handleUnmount;
  }, [isActive]);

  const handleMount = () => {
    if (ref.current && xPos !== undefined && yPos !== undefined) {
      ref.current.style.transition = 'none';
      ref.current.style.left = xPos + 'px';
      ref.current.style.top = yPos + 'px';
      ref.current.style.transform = 'translate(-50%, -50%) scale(0)';
    }

    setTimeout(function () {
      if (ref.current) {
        ref.current.style.transition = 'all 0.5s';
        ref.current.style.top = '50%';
        ref.current.style.left = '50%';
        ref.current.style.transform = 'translate(-50%, -50%) scale(1)';
        ref.current.style.display = 'flex';
      }
    }, 0);
  };

  const handleUnmount = () => {
    if (ref.current) {
      ref.current.style.transition = 'none';
      ref.current.style.top = '50%';
      ref.current.style.left = '50%';
      ref.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
      ref.current.style.display = 'flex';
    }

    setTimeout(function () {
      if (ref.current && xPos !== undefined && yPos !== undefined) {
        ref.current.style.transition = 'all 0.5s';
        ref.current.style.left = xPos + 'px';
        ref.current.style.top = yPos + 'px';
        ref.current.style.transform = 'translate(-50%, -50%) scale(0)';
      }
    }, 0);
  };

  return (
    <>
      {isActive ? (
        <div className={styles.background} onClick={onClick}>
          <div className={styles.modalBody} ref={ref}></div>
        </div>
      ) : null}
    </>
  );
};

interface typeUserManagePopup {
  isActive: boolean;
  xPos?: number;
  yPos?: number;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default UserManagePopup;
