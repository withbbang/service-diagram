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
  const [edgePath, middleX] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  // 제어점 4개의 베지어 곡선 방정식을 이용한 좌표 반환 함수
  // B(t) = (1 - t)³ * P0 + 3(1 - t)² * t * P1 + 3(1 - t) * t² * P2 + t³ * P3
  const handleGetCoordinate = (posArr: Array<number>, position: string) => {
    const t = position === 'right' ? 0.15 : 0.85;
    return (
      Math.pow(1 - t, 3) * posArr[0] +
      3 * Math.pow(1 - t, 2) * t * posArr[1] +
      3 * (1 - t) * Math.pow(t, 2) * posArr[2] +
      Math.pow(t, 3) * posArr[3]
    );
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          className={styles.label}
          style={{
            transform: `translate(${handleGetCoordinate(
              [sourceX, middleX, middleX, targetX],
              sourcePosition
            )}px, ${handleGetCoordinate(
              [sourceY, sourceY, targetY, targetY],
              sourcePosition
            )}px)`
          }}
        >
          {'1'}
        </div>
        <div
          className={styles.label}
          style={{
            transform: `translate(${handleGetCoordinate(
              [sourceX, middleX, middleX, targetX],
              targetPosition
            )}px, ${handleGetCoordinate(
              [sourceY, sourceY, targetY, targetY],
              targetPosition
            )}px)`
          }}
        >
          {'*'}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default NormalEdge;
