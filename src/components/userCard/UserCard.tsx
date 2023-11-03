import React from 'react';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue
} from 'middlewares/reduxToolkits/commonSlice';
import SVG from 'modules/SVG';
import styles from './UserCard.module.scss';
import { handleReturnAuthority } from 'modules/utils';

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
  userNickname,
  onClickCard
}: typeUserCard): JSX.Element => {
  return (
    <div
      className={
        isDeleted === 'Y'
          ? [styles.wrap, styles.deleted].join(' ')
          : styles.wrap
      }
      onClick={(e) => onClickCard(e, id)}
    >
      <div className={styles.topInfo}>
        <span>
          <SVG type="user" width="20px" height="20px" />
          &nbsp;{userNickname}
        </span>
        <span>
          <SVG type="authority" width="20px" height="20px" />
          &nbsp;{handleReturnAuthority(grade)}
        </span>
      </div>
      <div className={styles.middleInfo}>{userEmail}</div>
      <div className={styles.bottomInfo}>
        <span>
          <SVG type="company" width="20px" height="20px" />
          &nbsp;{company}
        </span>
        <span>
          {isDeleted === 'Y' ? (
            <>
              <SVG type="time" width="20px" height="20px" fill="#ff2014" />
              &nbsp;{deleteDt}
            </>
          ) : (
            <>
              <SVG type="time" width="20px" height="20px" />
              &nbsp;{createDt}
            </>
          )}
        </span>
      </div>
    </div>
  );
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
  onClickCard: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id?: string
  ) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
