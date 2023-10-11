import DiagramsCT from './DiagramsCT';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue,
  handleSetUserInfo
} from 'middlewares/reduxToolkits/commonSlice';

const mapStateToProps = (state: PropState): CommonState => {
  return { ...state.common };
};

const mapDispatchToProps = (dispatch: (actionFunction: Action<any>) => any) => {
  return {
    handleLoaderTrue: (): void => {
      dispatch(handleLoaderTrue());
    },
    handleLoaderFalse: (): void => {
      dispatch(handleLoaderFalse());
    },
    handleSetUserInfo: (payload: {
      uid: string;
      email: string;
      nickname: string;
    }): void => {
      dispatch(handleSetUserInfo(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiagramsCT);
