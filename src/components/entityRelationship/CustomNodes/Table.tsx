import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import SVG from 'modules/SVG';
import { typeColumn, typeCustomNode } from 'modules/types';
import styles from './CommonNodeStyles.module.scss';

function Table({
  id,
  data,
  isConnectable,
  selected
}: typeCustomNode): JSX.Element {
  // console.log(data);
  const {
    idx,
    tableName,
    tableComment,
    columns,
    editPossible,
    onSetSelectedTableIdxForUpdate,
    onSetSelectedTableIdxForDelete
  } = data;

  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableName}>
        {tableName}
        {editPossible && (
          <div className={styles.floatBtns}>
            <span onClick={() => onSetSelectedTableIdxForUpdate(idx)}>
              <SVG type="modify" width="10px" height="10px" />
            </span>
            <span onClick={() => onSetSelectedTableIdxForDelete(idx)}>
              <SVG type="trash" width="10px" height="10px" />
            </span>
          </div>
        )}
      </div>
      <div
        className={
          columns && columns.length > 0
            ? styles.tableComment
            : [styles.tableComment, styles.nothing].join(' ')
        }
        style={
          tableComment === '' ? { fontStyle: 'italic', color: '#aaa' } : {}
        }
      >
        {tableComment ? tableComment : '(No Comment)'}
      </div>
      {columns &&
        columns.length > 0 &&
        columns.map((column: typeColumn, idx: number) => (
          <div
            className={
              idx + 1 === columns.length
                ? [styles.column, styles.isLast].join(' ')
                : styles.column
            }
            key={idx}
          >
            <Handle
              id={`${id}-left-target-${idx + 1}`}
              type={'target'}
              position={Position.Left}
              isConnectable={isConnectable}
              style={{
                backgroundColor: '#aaa'
              }}
            />
            <Handle
              id={`${id}-left-source-${idx + 1}`}
              type={'source'}
              position={Position.Left}
              isConnectable={isConnectable}
              style={{
                backgroundColor: '#aaa'
              }}
            />
            <Handle
              id={`${id}-right-target-${idx + 1}`}
              type={'target'}
              position={Position.Right}
              isConnectable={isConnectable}
              style={{
                backgroundColor: '#aaa'
              }}
            />
            <Handle
              id={`${id}-right-source-${idx + 1}`}
              type={'source'}
              position={Position.Right}
              isConnectable={isConnectable}
              style={{
                backgroundColor: '#aaa'
              }}
            />
            <div className={styles.description}>
              <div className={styles.top}>
                <strong>{column.name}</strong>
                <span>{column.type}</span>
              </div>
              <div className={styles.bottom}>
                <p className={styles.boolType}>
                  {column.primary && <strong>(Primary)</strong>}
                  {column.unique && <strong>(Unique)</strong>}
                  {column.notNull && <strong>(Not Null)</strong>}
                  {column.autoIncrement && <strong>(Auto Increment)</strong>}
                </p>
                <p>
                  <strong>Default:</strong>
                  <span className={column.default === '' ? styles.nothing : ''}>
                    {column.default ? column.default : '(Unset)'}
                  </span>
                </p>
                <p>
                  <strong>Comment:</strong>
                  <span className={column.comment === '' ? styles.nothing : ''}>
                    {column.comment ? column.comment : '(No Comment)'}
                  </span>
                </p>
              </div>
            </div>
            <p>
              {column.name}
              {column.primary && (
                <span>
                  <SVG type="key" width="15px" height="15px" />
                </span>
              )}
            </p>
            <span>{column.type}</span>
          </div>
        ))}
    </div>
  );
}

export default memo(Table);
