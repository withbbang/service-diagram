import React from 'react';
import { PropState } from 'middlewares/configureReducer';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import styles from './ConfirmPopup.module.scss';

const mapStateToProps = (state: PropState): CommonState => {
  return {
    ...state.common
  };
};

const mapDispatchToProps = (dispatch: (actionFunction: Action<any>) => any) => {
  return {};
};

const ConfirmPopup = ({
  isActive,
  confirmMessage,
  confirmType,
  onConfirm,
  onCancel
}: typeConfirmPopup): JSX.Element => {
  return (
    <>
      {isActive ? (
        <div className={styles.background}>
          <div className={styles.modal_body}>
            <span>{confirmMessage}</span>
            <div>
              <button onClick={() => onCancel()}>Cancel</button>
              <button onClick={() => onConfirm()}>Confirm</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

interface typeConfirmPopup extends CommonState {
  isActive: boolean;
  confirmMessage: string;
  confirmType?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPopup);
