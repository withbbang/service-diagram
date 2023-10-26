import React, { useEffect, useRef } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import styles from './ErrorPopup.module.scss';

const mapStateToProps = (state: PropState): CommonState => {
  return {
    ...state.common
  };
};

const mapDispatchToProps = (dispatch: (actionFunction: Action<any>) => any) => {
  return {};
};

const ErrorPopup = ({
  isActive,
  errorMessage,
  onConfirm
}: typeErrorPopup): JSX.Element => {
  const buttonRef = useRef(
    null
  ) as React.MutableRefObject<HTMLButtonElement | null>;

  useEffect(() => {
    buttonRef.current?.focus();
  }, [isActive]);

  return (
    <>
      {isActive && (
        <div className={styles.background}>
          <div className={styles.modalBody}>
            <span>{errorMessage}</span>
            <div>
              <button onClick={() => onConfirm()} ref={buttonRef}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface typeErrorPopup extends CommonState {
  isActive: boolean;
  errorMessage: string;
  onConfirm: () => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPopup);
