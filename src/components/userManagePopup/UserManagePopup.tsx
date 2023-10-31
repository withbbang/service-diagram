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
    isActive ? handleMount() : handleUnmount();
  }, [isActive]);

  const handleMount = () => {
    if (ref.current) {
      ref.current.style.transition = 'none';
      ref.current.style.left = xPos + 'px';
      ref.current.style.top = yPos + 'px';
    }

    setTimeout(function () {
      if (ref.current) {
        ref.current.style.transition = 'all 0.5s';
        ref.current.style.top = '50%';
        ref.current.style.left = '50%';
        ref.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 0);
  };

  const handleUnmount = () => {
    if (ref.current) {
      ref.current.style.top = yPos + 'px';
      ref.current.style.left = xPos + 'px';
      ref.current.style.transform = 'translate(-50%, -50%) scale(0)';
    }
  };

  return (
    <>
      <div
        className={
          isActive
            ? [styles.background, styles.isActive].join(' ')
            : styles.background
        }
        onClick={onClick}
      ></div>
      <div className={styles.modalBody} ref={ref}></div>
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
