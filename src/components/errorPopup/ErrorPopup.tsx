import React from 'react';
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
  return (
    <>
      {isActive ? (
        <div className={styles.background}>
          <div className={styles.modal_body}>
            <span>{errorMessage}</span>
            <div>
              <button onClick={() => onConfirm()}>OK</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

interface typeErrorPopup extends CommonState {
  isActive: boolean;
  errorMessage: string;
  onConfirm: () => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPopup);
