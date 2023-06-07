import React from 'react';
import { BaseEdge, BezierEdge, EdgeProps } from 'reactflow';

const SelfConnecting = (props: EdgeProps): JSX.Element => {
  // we are using the default bezier edge when source and target ids are different
  if (props.sourcePosition !== props.targetPosition) {
    return <BezierEdge {...props} />;
  }

  const { sourceX, sourceY, sourcePosition, style, markerEnd } = props;

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
        startX -= 3;
        radiusX = 50;
        radiusY = 20;
        isTopRight = 1;
        endX += 3;
        break;
      case 'left':
        startY -= 3;
        radiusX = 20;
        radiusY = 30;
        endY += 3;
        break;
      case 'bottom':
        startX -= 3;
        radiusX = 50;
        radiusY = 20;
        endX += 3;
        break;
      case 'right':
        startY -= 3;
        radiusX = 20;
        radiusY = 30;
        isTopRight = 1;
        endY += 3;
        break;
      default:
        break;
    }

    return `M ${startX}
    ${startY} A ${radiusX} ${radiusY} 0 1 ${isTopRight} ${endX} ${endY}`;
  };

  return (
    <BaseEdge
      path={handlePath(sourcePosition)}
      markerEnd={markerEnd}
      style={style}
    />
  );
};

export default SelfConnecting;
