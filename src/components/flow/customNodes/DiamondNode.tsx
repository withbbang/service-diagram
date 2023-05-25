import { memo, useState } from 'react';
import {
  Handle,
  Position,
  NodeResizer,
  ResizeDragEvent,
  ResizeParamsWithDirection,
  ResizeParams
} from 'reactflow';
import { typeCustomHandle, typeCustomNode } from 'modules/types';
import styles from './CommonNodeStyles.module.scss';

function DiamondNode({ data, isConnectable, selected }: typeCustomNode) {
  // TODO: data에 추가 값을 넣어 실시간으로 Handle 타입정의 필요
  const [width, setWitdh] = useState<number>(150);
  const [height, setHeight] = useState<number>(80);

  const { handleType }: { handleType: typeCustomHandle } = data;

  const handleResize = (
    e: ResizeDragEvent,
    params: ResizeParamsWithDirection
  ) => {
    setWitdh(params.width);
    setHeight(params.height);
  };

  const handleResizeEnd = (e: ResizeDragEvent, params: ResizeParams) => {
    setWitdh(params.width);
    setHeight(params.height);
  };

  return (
    <div
      className={styles.diamondNode}
      style={{
        minWidth: '150px',
        minHeight: '80px',
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={150}
        minHeight={80}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
      />
      <Handle
        id="a"
        type={
          handleType.includes('top') || handleType === 'all'
            ? 'target'
            : 'source'
        }
        position={Position.Top}
        isConnectable={isConnectable}
        style={{
          backgroundColor: `${
            handleType.includes('top') || handleType === 'all' ? '#000' : '#aaa'
          }`
        }}
      />
      <Handle
        id="b"
        type={
          handleType.includes('left') || handleType === 'all'
            ? 'target'
            : 'source'
        }
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          backgroundColor: `${
            handleType.includes('left') || handleType === 'all'
              ? '#000'
              : '#aaa'
          }`
        }}
      />
      <Handle
        id="c"
        type={
          handleType.includes('bottom') || handleType === 'all'
            ? 'target'
            : 'source'
        }
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{
          backgroundColor: `${
            handleType.includes('bottom') || handleType === 'all'
              ? '#000'
              : '#aaa'
          }`
        }}
      />
      <Handle
        id="d"
        type={
          handleType.includes('right') || handleType === 'all'
            ? 'target'
            : 'source'
        }
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          backgroundColor: `${
            handleType.includes('right') || handleType === 'all'
              ? '#000'
              : '#aaa'
          }`
        }}
      />
      {data.label ? data.label : ''}
    </div>
  );
}

export default memo(DiamondNode);
