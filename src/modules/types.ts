export interface typeSVG {
  type?: string;
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
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
