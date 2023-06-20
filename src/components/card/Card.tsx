import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';
import SVG from 'modules/SVG';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

const Card = ({ id, title, path, onDeleteBtn }: typeCard): JSX.Element => {
  const navigate = useNavigate();

  const handleUpdateBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('click');
  };

  return (
    <div className={styles.wrap} onClick={() => navigate(path)}>
      {id !== '0' && (
        <div className={styles.floatBtns}>
          <span onClick={(e) => handleUpdateBtn(e)}>
            <SVG type="modify" width="20px" height="20px" />
          </span>
          <span onClick={(e) => onDeleteBtn && onDeleteBtn(e, id)}>
            <SVG type="trash" width="20px" height="20px" />
          </span>
        </div>
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

interface typeCard {
  idx: number;
  id: string;
  title: string;
  path: string;
  onDeleteBtn?: (e: React.MouseEvent, selectedContentId: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
