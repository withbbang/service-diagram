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
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          className={styles.label}
          style={{
            transform: `translate(${
              sourcePosition === Position.Right ? '25%' : '-125%'
            }, -50%) translate(${sourceX}px,${sourceY}px)`
          }}
        >
          {'1'}
        </div>
        <div
          className={styles.label}
          style={{
            transform: `translate(${
              targetPosition === Position.Right ? '25%' : '-125%'
            }, -50%) translate(${targetX}px,${targetY}px)`
          }}
        >
          {'*'}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default NormalEdge;
