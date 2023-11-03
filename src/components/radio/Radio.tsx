import React from 'react';
import styles from './Radio.module.scss';

const Radio = ({ authority, checked, grade, onChangeNewGrade }: typeRadio) => {
  return (
    <label htmlFor={authority} className={styles.radioLabel}>
      <input
        className={styles.radioInput}
        type="radio"
        name={authority}
        id={authority}
        value={grade}
        onChange={() => onChangeNewGrade(grade)}
        checked={checked}
      />
      <span className={styles.customRadio} />
      {authority}
    </label>
  );
};

interface typeRadio {
  authority: string;
  checked: boolean;
  grade: number;
  onChangeNewGrade: (grade: number) => void;
}

export default Radio;
