import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { typeColumn, typeCustomNode } from 'modules/types';
import styles from './CommonNodeStyles.module.scss';
import SVG from 'modules/SVG';

function Table({ data, isConnectable }: typeCustomNode): JSX.Element {
  return (
    <div className={styles.tableWrap}>
      <div
        className={
          data.columns && data.columns.length > 0
            ? styles.tableName
            : [styles.tableName, styles.nothing].join(' ')
        }
      >
        {data.tableName}
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
