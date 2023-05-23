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

const Card = ({ idx, id, title, path }: typeCard): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap} onClick={() => navigate(path)}>
      <h3>{title}</h3>
      {id === 0 && (
        <span className={styles.add}>
          <SVG type="add" width="100px" height="100px" />
        </span>
      )}
    </div>
  );
};

interface typeCard {
  idx: number;
  id: number;
  title: string;
  path: string;
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
