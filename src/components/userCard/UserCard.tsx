import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue
} from 'middlewares/reduxToolkits/commonSlice';
import SVG from 'modules/SVG';
import styles from './UserCard.module.scss';
import { handleHasPermission } from 'modules/utils';

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
    }
  };
};

const UserCard = ({
  id,
  company,
  createDt,
  deleteDt,
  userEmail,
  grade,
  isDeleted,
  userNickname
}: typeUserCard): JSX.Element => {
  return <div className={styles.wrap}>{userNickname}</div>;
};

interface typeUserCard extends CommonState {
  id: string;
  company: string;
  createDt: string;
  deleteDt?: string;
  userEmail: string;
  grade: number;
  isDeleted: string;
  userNickname: string;
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
