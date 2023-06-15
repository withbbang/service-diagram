import { typeCustomEdge } from 'modules/types';
import styles from './CommonEdgeStyles.module.scss';
import SVG from 'modules/SVG';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  Position
} from 'reactflow';

function NormalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data
}: typeCustomEdge): JSX.Element {
  const [edgePath, middleX, middleY, offsetX, offsetY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  console.log('edgePath: ', edgePath);
  console.log('middleX: ', middleX);
  console.log('middleY: ', middleY);
  console.log('offsetX: ', offsetX);
  console.log('offsetY: ', offsetY);
  console.log('sourceX: ', sourceX);
  console.log('sourceY: ', sourceY);
  console.log('targetX: ', targetX);
  console.log('targetY: ', targetY);

  const handleGetMiddle = (pos1: number, pos2: number) => (pos1 + pos2) / 2;

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          className={styles.label}
          style={{
            transform: `translate(${handleGetMiddle(
              sourceX,
              middleX
            )}px,${handleGetMiddle(sourceY, middleY)}px)`
          }}
        >
          {'1'}
        </div>
        <div
          className={styles.label}
          style={{
            transform: `translate(${handleGetMiddle(
              targetX,
              middleX
            )}px,${handleGetMiddle(targetY, middleY)}px)`
          }}
        >
          {'*'}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default NormalEdge;
