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
import styles from './CommonNodeStyles.module.scss';

function RectangleNode({ data, isConnectable, selected }: typeCustomNode) {
  const initWidth = 150,
    initHeight = 40;

  const [width, setWitdh] = useState<number>(
    data.width ? data.width : initWidth
  );
  const [height, setHeight] = useState<number>(
    data.height ? data.height : initHeight
  );

  //TODO: 상위에서 노드 사이즈 저장 필요
  const handleResize = (
    e: ResizeDragEvent,
    params: ResizeParamsWithDirection
  ) => {
    setWitdh(params.width);
    setHeight(params.height);
  };

  //TODO: 상위에서 노드 사이즈 저장 필요
  const handleResizeEnd = (e: ResizeDragEvent, params: ResizeParams) => {
    setWitdh(params.width);
    setHeight(params.height);
  };

  return (
    <div
      className={styles.rectangleNode}
      style={{
        minWidth: `${initWidth}px`,
        minHeight: `${initHeight}px`,
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={initWidth}
        minHeight={initHeight}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
      />
      <Handle
        id="top-target"
        type={'target'}
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ backgroundColor: '#aaa' }}
      />
      <Handle
        id="top-source"
        type={'source'}
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ backgroundColor: '#aaa' }}
      />
      <Handle
        id="left-target"
        type={'target'}
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ backgroundColor: '#aaa' }}
      />
      <Handle
        id="left-source"
        type={'source'}
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ backgroundColor: '#aaa' }}
      />
      <Handle
        id="bottom-target"
        type={'target'}
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ backgroundColor: '#aaa' }}
      />
      <Handle
        id="bottom-source"
        type={'source'}
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ backgroundColor: '#aaa' }}
      />
      <Handle
        id="right-target"
        type={'target'}
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ backgroundColor: '#aaa' }}
      />
      <Handle
        id="right-source"
        type={'source'}
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ backgroundColor: '#aaa' }}
      />
      {data.label ? data.label : ''}
    </div>
  );
}

export default memo(RectangleNode);
