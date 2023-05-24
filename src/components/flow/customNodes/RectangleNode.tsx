import { Handle, Position } from 'reactflow';
import styles from './CommonNode.module.scss';

function RectangleNode({ data, isConnectable }: typeRectangleNode) {
  // TODO: data에 추가 값을 넣어 실시간으로 타입정의 필요

  return (
    <div className={styles.rectangleNode}>
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

interface typeRectangleNode {
  data: any;
  isConnectable?: boolean;
}

export default RectangleNode;
