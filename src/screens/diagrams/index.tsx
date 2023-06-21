import DiagramsCT from './DiagramsCT';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue,
  handleSetUid
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
    handleSetUid: (uid: string): void => {
      dispatch(handleSetUid({ uid }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiagramsCT);
