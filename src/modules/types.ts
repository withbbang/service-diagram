export interface typeSVG {
  type?: string;
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
  fillTop?: string;
  fillLeft?: string;
  fillBottom?: string;
  fillRight?: string;
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
