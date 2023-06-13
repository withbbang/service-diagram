import { typeColumn } from 'modules/types';
import styles from './Column.module.scss';
import { ChangeEvent } from 'react';

function Column({
  idx,
  column,
  columnInputRefs,
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
            // ref={(el) => (columnInputRefs.current['name' + idx] = el)}
          />
        </div>
        <div className={styles.inputDiv}>
          <span>Type</span>
          <input
            value={column.type}
            onChange={(e) => onColumnInputChange(idx, 'type', e)}
            // ref={(el) => (columnInputRefs.current['type' + idx] = el)}
          />
        </div>
        <div className={styles.inputDiv}>
          <span>Comment</span>
          <input
            value={column.comment}
            onChange={(e) => onColumnInputChange(idx, 'comment', e)}
            // ref={(el) => (columnInputRefs.current['comment' + idx] = el)}
          />
        </div>
        <div className={styles.inputDiv}>
          <span>Default</span>
          <input
            value={column.default}
            onChange={(e) => onColumnInputChange(idx, 'default', e)}
            // ref={(el) => (columnInputRefs.current['default' + idx] = el)}
          />
        </div>
      </div>
      <div className={styles.checkBoxes}>
        <div className={styles.inputDiv}>
          <input
            type="checkbox"
            checked={column.primary}
            onChange={(e) => onColumnInputChange(idx, 'primary', e)}
            // ref={(el) => (columnInputRefs.current['primary' + idx] = el)}
          />
          <span>Primary</span>
        </div>
        <div className={styles.inputDiv}>
          <input
            type="checkbox"
            checked={column.unique}
            onChange={(e) => onColumnInputChange(idx, 'unique', e)}
            // ref={(el) => (columnInputRefs.current['unique' + idx] = el)}
          />
          <span>Unique</span>
        </div>
        <div className={styles.inputDiv}>
          <input
            type="checkbox"
            checked={column.notNull}
            onChange={(e) => onColumnInputChange(idx, 'notNull', e)}
            // ref={(el) => (columnInputRefs.current['notNull' + idx] = el)}
          />
          <span>Not Null</span>
        </div>
        <div className={styles.inputDiv}>
          <input
            type="checkbox"
            checked={column.autoIncrement}
            onChange={(e) => onColumnInputChange(idx, 'autoIncrement', e)}
            // ref={(el) => (columnInputRefs.current['autoIncrement' + idx] = el)}
          />
          <span>Auto Increment</span>
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
  columnInputRefs: React.MutableRefObject<any>;
  onColumnInputChange: (
    idx: number,
    type: string,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  onAddColumn: (tableId?: string) => void;
  onRemoveColumn: (idx: number, tableId?: string) => void;
}

export default Column;
