import React from 'react';
import { BaseEdge, BezierEdge, EdgeProps } from 'reactflow';

const SelfConnecting = (props: EdgeProps): JSX.Element => {
  // we are using the default bezier edge when source and target ids are different
  if (props.sourcePosition !== props.targetPosition) {
    return <BezierEdge {...props} />;
  }

  const { sourceX, sourceY, sourcePosition, style, markerEnd } = props;

  const handlePath = (position: string) => {
    let startX = 0,
      startY = 0,
      radiusX = 0,
      radiusY = 0,
      isTopRight = 0,
      endX = 0,
      endY = 0;

    switch (position) {
      case 'top':
        startX = sourceX - 3;
        startY = sourceY;
        radiusX = 50;
        radiusY = 20;
        isTopRight = 1;
        endX = sourceX + 3;
        endY = sourceY;
        break;
      case 'left':
        startX = sourceX;
        startY = sourceY - 3;
        radiusX = 20;
        radiusY = 30;
        isTopRight = 0;
        endX = sourceX;
        endY = sourceY + 3;
        break;
      case 'bottom':
        startX = sourceX - 3;
        startY = sourceY;
        radiusX = 50;
        radiusY = 20;
        isTopRight = 0;
        endX = sourceX + 3;
        endY = sourceY;
        break;
      case 'right':
        startX = sourceX;
        startY = sourceY - 3;
        radiusX = 20;
        radiusY = 30;
        isTopRight = 1;
        endX = sourceX;
        endY = sourceY + 3;
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
