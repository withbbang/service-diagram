import React, { useEffect, useRef, useState } from 'react';
import { typeAuthority } from 'modules/types';
import SVG from 'modules/SVG';
import styles from './UserManagePopup.module.scss';
import Radio from 'components/radio/Radio';
import { handleReturnAuthority } from 'modules/utils';

const UserManagePopup = ({
  xPos,
  yPos,
  isActive,
  newGrade,
  user,
  onClick,
  onSetNewGrade,
  onUpdateBtn
}: typeUserManagePopup): JSX.Element => {
  const ref = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;
  const authorities = [0, 5, 10, 15, 20];

  useEffect(() => {
    if (isActive) {
      handleActivePopup();
      user && onSetNewGrade(user.grade);
    } else {
      handleInActivePopup();
      onSetNewGrade(20);
    }
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
      <div className={styles.modalBody} ref={ref}>
        {user && (
          <>
            <h3>{user.email}</h3>
            <div className={styles.radios}>
              {authorities.map((authority) => (
                <Radio
                  key={authority}
                  authority={handleReturnAuthority(authority)}
                  checked={authority === newGrade}
                  grade={authority}
                  onChangeNewGrade={onSetNewGrade}
                />
              ))}
            </div>
            <div className={styles.bottom}>
              <button onClick={onUpdateBtn}>OK</button>
              <div>
                <SVG type="update" width="20px" height="20px" />
                &nbsp;{user.updateDt ? user.updateDt : '---- -- --'}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

interface typeUserManagePopup {
  xPos?: number;
  yPos?: number;
  isActive: boolean;
  newGrade: number;
  user?: typeAuthority;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id?: string
  ) => void;
  onSetNewGrade: React.Dispatch<React.SetStateAction<number>>;
  onUpdateBtn: () => void;
}

export default UserManagePopup;
