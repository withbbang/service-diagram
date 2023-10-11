import { DocumentData } from 'firebase/firestore';
import { EdgeProps, NodeProps } from 'reactflow';

export interface typeSVG {
  type?: string;
  etcType?: string;
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
}

export interface typeIcon {
  path: JSX.Element;
  size: number;
}

export interface typeCustomNode extends NodeProps {}

export interface typeColumn {
  // TODO: (공부하기) 개체 유형에 인덱스 서명 추가
  // Error: No index signature with a parameter of type 'string' was found on type 'someType'
  [key: string]: string | boolean;
  name: string;
  type: string;
  comment: string;
  default: string;
  primary: boolean;
  unique: boolean;
  notNull: boolean;
  autoIncrement: boolean;
}

export interface typeCustomEdge extends EdgeProps {}

export interface typeContent extends DocumentData {
  id: string;
  createdBy: string;
  title: string;
}
