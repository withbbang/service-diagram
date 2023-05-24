import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import { typeCustomNode } from 'modules/types';
import styles from './CommonNode.module.scss';

function RectangleNode({ data, isConnectable, selected }: typeCustomNode) {
  // TODO: data에 추가 값을 넣어 실시간으로 타입정의 필요

  return (
    <div className={styles.rectangleNode}>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="c"
        isConnectable={isConnectable}
      />
      {data.label ? data.label : ''}
    </div>
  );
}

export default memo(RectangleNode);
