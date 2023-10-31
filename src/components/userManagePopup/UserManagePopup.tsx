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
    isActive ? handleActivePopup() : handleInActivePopup();
  }, [isActive]);

  // 팝업 활성
  const handleActivePopup = () => {
    document.body.style.position = 'fixed';

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

  // 팝업 비활성
  const handleInActivePopup = () => {
    document.body.style.position = 'unset';

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
      />
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
