import { typeSVG } from './types';

const SVG = (props: typeSVG): JSX.Element => {
  switch (props.type) {
    case 'arrowRectangleNode':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="140"
          viewBox="0 0 200 140"
        >
          <rect
            x="20"
            y="20"
            width="160"
            height="100"
            fill="none"
            stroke="#000"
            strokeWidth="1"
          />
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
          </marker>

          <line
            x1="100"
            y1="10"
            x2="100"
            y2="30"
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <line
            xmlns="http://www.w3.org/2000/svg"
            x1="10"
            y1="70"
            x2="30"
            y2="70"
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <line
            x1="100"
            y1="130"
            x2="100"
            y2="110"
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <line
            xmlns="http://www.w3.org/2000/svg"
            x1="190"
            y1="70"
            x2="170"
            y2="70"
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
        </svg>
      );
    case 'arrowDiamondNode':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          height="100"
          viewBox="0 0 160 100"
        >
          <rect x="0" y="0" width="160" height="100" fill="none" />
          <path
            d="M20,50 L80,20 L140,50 L80,80 Z"
            fill="#fff"
            stroke="#000"
            strokeWidth="1"
          />
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
          </marker>

          <line
            x1="80"
            y1="10"
            x2="80"
            y2="30"
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <line
            xmlns="http://www.w3.org/2000/svg"
            x1="10"
            y1="50"
            x2="35"
            y2="50"
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <line
            x1="80"
            y1="90"
            x2="80"
            y2="70"
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <line
            xmlns="http://www.w3.org/2000/svg"
            x1="150"
            y1="50"
            x2="125"
            y2="50"
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
        </svg>
      );
    case 'rectangleNode':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="140"
          viewBox="0 0 200 140"
        >
          <rect
            x="20"
            y="20"
            width="160"
            height="100"
            fill="none"
            stroke="#000"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="20"
            r="8"
            fill={props.fillTop ? props.fillTop : '#aaa'}
          />
          <circle
            cx="20"
            cy="70"
            r="8"
            fill={props.fillLeft ? props.fillLeft : '#aaa'}
          />
          <circle
            cx="100"
            cy="120"
            r="8"
            fill={props.fillBottom ? props.fillBottom : '#aaa'}
          />
          <circle
            cx="180"
            cy="70"
            r="8"
            fill={props.fillRight ? props.fillRight : '#aaa'}
          />
        </svg>
      );
    case 'diamondNode':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          height="100"
          viewBox="0 0 160 100"
        >
          <rect x="0" y="0" width="160" height="100" fill="none" />
          <path
            d="M20,50 L80,20 L140,50 L80,80 Z"
            fill="#fff"
            stroke="#000"
            strokeWidth="1"
          />
          <circle
            cx="80"
            cy="20"
            r="8"
            fill={props.fillTop ? props.fillTop : '#aaa'}
          />
          <circle
            cx="20"
            cy="50"
            r="8"
            fill={props.fillLeft ? props.fillLeft : '#aaa'}
          />
          <circle
            cx="80"
            cy="80"
            r="8"
            fill={props.fillBottom ? props.fillBottom : '#aaa'}
          />
          <circle
            cx="140"
            cy="50"
            r="8"
            fill={props.fillRight ? props.fillRight : '#aaa'}
          />
        </svg>
      );
    case 'close':
      return (
        <svg
          width={props.width ? props.width : '30px'}
          height={props.height ? props.height : '30px'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Menu / Close_MD">
            <path
              id="Vector"
              d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
              stroke={props.fill ? props.fill : '#000'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );
    case 'add':
      return (
        <svg
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          fill={props.fill ? props.fill : '#000'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Zm5-9a1,1,0,0,1-1,1H13v3a1,1,0,0,1-2,0V13H8a1,1,0,0,1,0-2h3V8a1,1,0,0,1,2,0v3h3A1,1,0,0,1,17,12Z" />
        </svg>
      );
    case 'modify':
      return (
        <svg
          width={props.width ? props.width : '30px'}
          height={props.height ? props.height : '30px'}
          viewBox="0 -1 119 119"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g
            fill={props.fill ? props.fill : '#000'}
            fillRule="evenodd"
            id="Page-1"
            stroke="none"
            strokeWidth="1"
          >
            <g fillRule="nonzero" id="edit">
              <path
                d="M114.2,108.3 L4.8,108.3 C2.5,108.3 0.7,110.2 0.7,112.4 C0.7,114.6 2.6,116.5 4.8,116.5 L114.3,116.5 C116.6,116.5 118.4,114.6 118.4,112.4 C118.4,110.2 116.5,108.3 114.2,108.3 Z"
                fill={props.fill ? props.fill : '#000'}
                id="Shape"
              />
              <path
                d="M0.7,72 L0.6,91.5 C0.6,92.6 1,93.7 1.8,94.5 C2.6,95.3 3.6,95.7 4.7,95.7 L24.1,95.6 C25.2,95.6 26.2,95.2 27,94.4 L94,27.4 C95.6,25.8 95.6,23.2 94,21.5 L74.8,2.1 C73.2,0.5 70.6,0.5 68.9,2.1 L55.5,15.6 L1.9,69.1 C1.2,69.9 0.7,70.9 0.7,72 Z M71.9,10.9 L85.4,24.4 L77.8,32 L64.3,18.5 L71.9,10.9 Z M9,73.8 L58.4,24.4 L71.9,37.9 L22.5,87.2 L8.9,87.3 L9,73.8 Z"
                fill={props.fill ? props.fill : '#000'}
                id="Shape"
              />
            </g>
          </g>
        </svg>
      );
    default:
      return (
        <svg
          fill={props.fill ? props.fill : '#000'}
          width={props.width ? props.width : '25px'}
          height={props.height ? props.height : '25px'}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M7.35,9.8H8.63V8.56H7.35ZM9.6,3.49h0A2.9,2.9,0,0,0,7.88,3a2.38,2.38,0,0,0-1.32.35,2.13,2.13,0,0,0-.91,1.84H7a1.36,1.36,0,0,1,.22-.73.83.83,0,0,1,.75-.35.85.85,0,0,1,.74.28,1.06,1.06,0,0,1,.2.64.91.91,0,0,1-.18.55,1.33,1.33,0,0,1-.26.27l-.34.26a1.91,1.91,0,0,0-.61.68,3.43,3.43,0,0,0-.14,1.06H8.59a1.66,1.66,0,0,1,.06-.54A.93.93,0,0,1,9,6.83l.32-.25A3.29,3.29,0,0,0,10,6a1.62,1.62,0,0,0,.3-1A1.67,1.67,0,0,0,9.6,3.49ZM15,12V1H1V12H7.3v1.1H4v1.8h8V13.1H8.7V12ZM2.4,10.6V2.4H13.6v8.2Z" />
          </g>
        </svg>
      );
  }
};

export default SVG;
