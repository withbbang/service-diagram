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

export interface typeCustomNode {
  id: string;
  data: any;
  isConnectable: boolean;
  selected: boolean;
  xPos: number;
  yPos: number;
}

export type typeCustomHandle =
  | 'none'
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'top-left'
  | 'left-bottom'
  | 'bottom-right'
  | 'right-top'
  | 'top-left-bottom'
  | 'left-bottom-right'
  | 'bottom-right-top'
  | 'right-top-left'
  | 'left-right'
  | 'top-bottom'
  | 'all';
