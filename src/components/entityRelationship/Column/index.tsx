import { typeColumn } from 'modules/types';
import styles from './Column.module.scss';
import { ChangeEvent } from 'react';

function Column({
  idx,
  column,
  onColumnInputChange,
  onAddColumn,
  onRemoveColumn
}: typeColumnComponent): JSX.Element {
  return (
    <div className={styles.column}>
      <div className={styles.inputs}>
        <div className={styles.inputDiv}>
          <span>Name</span>
          <input
            value={column.name}
            onChange={(e) => onColumnInputChange(idx, 'name', e)}
          />
        </div>
        <div className={styles.inputDiv}>
          <span>Type</span>
          <input
            value={column.type}
            onChange={(e) => onColumnInputChange(idx, 'type', e)}
          />
        </div>
        <div className={styles.inputDiv}>
          <span>Comment</span>
          <input
            value={column.comment}
            onChange={(e) => onColumnInputChange(idx, 'comment', e)}
          />
        </div>
        <div className={styles.inputDiv}>
          <span>Default</span>
          <input
            value={column.default}
            onChange={(e) => onColumnInputChange(idx, 'default', e)}
          />
        </div>
      </div>
      <div className={styles.checkBoxes}>
        <div className={styles.inputDiv}>
          <input
            id={`primary_${idx}`}
            type="checkbox"
            checked={column.primary}
            onChange={(e) => onColumnInputChange(idx, 'primary', e)}
          />
          <label htmlFor={`primary_${idx}`}>Primary</label>
        </div>
        <div className={styles.inputDiv}>
          <input
            id={`unique_${idx}`}
            type="checkbox"
            checked={column.unique}
            onChange={(e) => onColumnInputChange(idx, 'unique', e)}
          />
          <label htmlFor={`unique_${idx}`}>Unique</label>
        </div>
        <div className={styles.inputDiv}>
          <input
            id={`notNull_${idx}`}
            type="checkbox"
            checked={column.notNull}
            onChange={(e) => onColumnInputChange(idx, 'notNull', e)}
          />
          <label htmlFor={`notNull_${idx}`}>Not Null</label>
        </div>
        <div className={styles.inputDiv}>
          <input
            id={`autoIncrement_${idx}`}
            type="checkbox"
            checked={column.autoIncrement}
            onChange={(e) => onColumnInputChange(idx, 'autoIncrement', e)}
          />
          <label htmlFor={`autoIncrement_${idx}`}>Auto Increment</label>
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => onRemoveColumn(idx)}>Remove Column</button>
        <button onClick={() => onAddColumn()}>Add Column</button>
      </div>
    </div>
  );
}

interface typeColumnComponent {
  idx: number;
  column: typeColumn;
  onColumnInputChange: (
    idx: number,
    type: string,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  onAddColumn: (tableId?: string) => void;
  onRemoveColumn: (idx: number, tableId?: string) => void;
}

export default Column;
