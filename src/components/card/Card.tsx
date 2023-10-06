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
import styles from './Card.module.scss';
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

const Card = ({
  id,
  title,
  corporate,
  createDt,
  type,
  path,
  grade,
  onDeleteBtn
}: typeCard): JSX.Element => {
  const navigate = useNavigate();

  const handleUpdateBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    type && navigate(`/diagram/${type}/update/${id}`);
  };

  return (
    <div className={styles.wrap} onClick={() => navigate(path)}>
      {type && (
        <div className={styles.floatCategory}>
          <span>
            <SVG type="category" width="20px" height="20px" />
            &nbsp;
            {type}
          </span>
        </div>
      )}
      {id !== '0' && handleHasPermission(['u', 'd'], grade) ? (
        <div className={styles.floatBtns}>
          <span onClick={(e) => handleUpdateBtn(e)}>
            <SVG type="modify" width="20px" height="20px" />
          </span>
          <span onClick={(e) => onDeleteBtn && onDeleteBtn(e, id)}>
            <SVG type="trash" width="20px" height="20px" />
          </span>
        </div>
      ) : (
        ''
      )}
      <h3>{title}</h3>
      <div className={styles.cardInfo}>
        {corporate && (
          <span>
            {/* TODO: 나중에 주석 풀것 */}
            {/* <SVG type="corporate" width="18px" height="18px" />
            &nbsp;{corporate} */}
          </span>
        )}
        <span>{createDt && createDt}</span>
      </div>
      {id === '0' && (
        <span className={styles.add}>
          <SVG type="add" width="100px" height="100px" />
        </span>
      )}
    </div>
  );
};

interface typeCard extends CommonState {
  idx: number;
  id: string;
  title: string;
  corporate?: string;
  createDt?: string;
  type?: string;
  path: string;
  grade?: number;
  onDeleteBtn?: (e: React.MouseEvent, selectedContentId: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
