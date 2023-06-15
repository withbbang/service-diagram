import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { typeColumn, typeCustomNode } from 'modules/types';
import styles from './CommonNodeStyles.module.scss';
import SVG from 'modules/SVG';

function Table({
  id,
  data,
  isConnectable,
  selected
}: typeCustomNode): JSX.Element {
  // console.log(data);
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableName}>
        {data.tableName}
        <div className={styles.floatBtns}>
          <span onClick={() => data.onSetSelectedTableIdxForUpdate(data.idx)}>
            <SVG type="modify" width="10px" height="10px" />
          </span>
          <span onClick={() => data.onSetSelectedTableIdxForDelete(data.idx)}>
            <SVG type="trash" width="10px" height="10px" />
          </span>
        </div>
      </div>
      <div
        className={
          data.columns && data.columns.length > 0
            ? styles.tableComment
            : [styles.tableComment, styles.nothing].join(' ')
        }
        style={
          data.tableComment === '' ? { fontStyle: 'italic', color: '#aaa' } : {}
        }
      >
        {data.tableComment ? data.tableComment : '(No Comment)'}
      </div>
      {data.columns &&
        data.columns.length > 0 &&
        data.columns.map((column: typeColumn, idx: number) => (
          <div
            className={
              idx + 1 === data.columns.length
                ? [styles.column, styles.isLast].join(' ')
                : styles.column
            }
            key={idx}
          >
            <Handle
              id={`left-target-${idx + 1}`}
              type={'target'}
              position={Position.Left}
              isConnectable={isConnectable}
              style={{
                backgroundColor: '#aaa'
              }}
            />
            <Handle
              id={`left-source-${idx + 1}`}
              type={'source'}
              position={Position.Left}
              isConnectable={isConnectable}
              style={{
                backgroundColor: '#aaa'
              }}
            />
            <Handle
              id={`right-target-${idx + 1}`}
              type={'target'}
              position={Position.Right}
              isConnectable={isConnectable}
              style={{
                backgroundColor: '#aaa'
              }}
            />
            <Handle
              id={`right-source-${idx + 1}`}
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
