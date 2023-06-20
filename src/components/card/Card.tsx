import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue
} from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'modules/utils';
import SVG from 'modules/SVG';
import styles from './Card.module.scss';

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
  uid,
  id,
  title,
  type,
  path,
  onDeleteBtn
}: typeCard): JSX.Element => {
  const navigate = useNavigate();
  const [uid_, setUid_] = useState<string>('');

  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      handleLoaderTrue();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid_(user.uid);
        }
        handleLoaderFalse();
      });
    } else {
      setUid_('');
    }
  }, [uid]);

  const handleUpdateBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    type && navigate(`/diagram/${type}/update/${id}`);
  };

  return (
    <div className={styles.wrap} onClick={() => navigate(path)}>
      {id !== '0' &&
      uid !== undefined &&
      uid !== null &&
      uid !== '' &&
      uid_ !== '' &&
      uid === uid_ ? (
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
  type?: string;
  path: string;
  onDeleteBtn?: (e: React.MouseEvent, selectedContentId: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
