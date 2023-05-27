import FlowCT from './FlowCT';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import {
  CommonState,
  handleCodeMessage
} from 'middlewares/reduxToolkits/commonSlice';
import { Action } from '@reduxjs/toolkit';

const mapStateToProps = (state: PropState): CommonState => {
  return { ...state.common };
};

const mapDispatchToProps = (dispatch: (actionFunction: Action<any>) => any) => {
  return {
    handleCodeMessage: (code: string, message: string): void => {
      dispatch(handleCodeMessage({ code, message }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowCT);