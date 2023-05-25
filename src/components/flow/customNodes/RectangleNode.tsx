import { memo, useState } from 'react';
import {
  Handle,
  Position,
  NodeResizer,
  ResizeDragEvent,
  ResizeParamsWithDirection,
  ResizeParams
} from 'reactflow';
import { typeCustomNode } from 'modules/types';
import styles from './CommonNode.module.scss';

function RectangleNode({ id, data, isConnectable, selected }: typeCustomNode) {
  // TODO: data에 추가 값을 넣어 실시간으로 타입정의 필요
  const [width, setWitdh] = useState<number>(150);
  const [height, setHeight] = useState<number>(40);

  /**************************************
   * 런타임 리사이즈 에러 방지를 위한 코드
   *************************************/
  const node = document.querySelector(`[data-id=${id}]`);

  const resizeObserver = new ResizeObserver(() => {
    if (node) {
      resizeObserver.unobserve(node);
      resizeObserver.unobserve(node.children[0]);
    }
    resizeObserver.disconnect();

    requestAnimationFrame(() => {
      if (node) {
        resizeObserver.observe(node);
        resizeObserver.observe(node.children[0]);
      }
    });
  });

  if (node) {
    resizeObserver.observe(node);
    resizeObserver.observe(node.children[0]);
  }
  /**************************************
   *************************************/

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
      className={styles.rectangleNode}
      style={{
        minWidth: '150px',
        minHeight: '40px',
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={150}
        minHeight={40}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
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
