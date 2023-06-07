import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  BezierEdge,
  EdgeProps,
  getBezierPath
} from 'reactflow';

const SelfConnecting = (props: EdgeProps): JSX.Element => {
  // we are using the default bezier edge when source and target ids are different
  if (props.sourcePosition !== props.targetPosition) {
    return <BezierEdge {...props} />;
  }

  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style,
    markerEnd,
    label
  } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  const rx = sourcePosition === 'top' || sourcePosition === 'bottom' ? 50 : 20;
  const ry = sourcePosition === 'top' || sourcePosition === 'bottom' ? 20 : 30;
  const diff = 3;

  const handlePath = (position: string) => {
    let startX = sourceX,
      startY = sourceY,
      radiusX = 0,
      radiusY = 0,
      isTopRight = 0,
      endX = sourceX,
      endY = sourceY;

    switch (position) {
      case 'top':
        startX -= diff;
        radiusX = rx;
        radiusY = ry;
        isTopRight = 1;
        endX += diff;
        break;
      case 'left':
        startY -= diff;
        radiusX = rx;
        radiusY = ry;
        endY += diff;
        break;
      case 'bottom':
        startX -= diff;
        radiusX = rx;
        radiusY = ry;
        endX += diff;
        break;
      case 'right':
        startY -= diff;
        radiusX = rx;
        radiusY = ry;
        isTopRight = 1;
        endY += diff;
        break;
      default:
        break;
    }

    return `M ${startX}
    ${startY} A ${radiusX} ${radiusY} 0 1 ${isTopRight} ${endX} ${endY}`;
  };

  const handleTranslate = (position: string) => {
    let labelPosX = labelX,
      labelPosY = labelY;

    switch (position) {
      case 'top':
        labelPosY = labelY - 2 * ry;
        break;
      case 'left':
        labelPosX = labelX - 2 * rx;
        break;
      case 'bottom':
        labelPosY = labelY + 2 * ry;
        break;
      case 'right':
        labelPosX = labelX + 2 * rx;
        break;
      default:
        break;
    }

    return `translate(${labelPosX}px,${labelPosY}px)`;
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={handlePath(sourcePosition)}
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) ${handleTranslate(
              sourcePosition
            )}`,
            fontSize: 11,
            pointerEvents: 'all'
          }}
          className="nodrag nopan"
        >
          {label ? label : ''}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default SelfConnecting;
