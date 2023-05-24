import { Handle, Position } from 'reactflow';
import styles from './CommonNode.module.scss';

function DiamondNode({ data, isConnectable }: typeDiamondNode) {
  console.log(data); // --> pass value & label in data

  return (
    <div className={styles.diamondNode}>
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

interface typeDiamondNode {
  data: any;
  isConnectable?: boolean;
}

export default DiamondNode;
