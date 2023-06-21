import { typeSVG } from './types';

const SVG = (props: typeSVG): JSX.Element => {
  switch (props.type) {
    case 'search':
      return (
        <svg
          fill="none"
          width={props.width ? props.width : '25px'}
          height={props.height ? props.height : '25px'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"
            fill={props.fill ? props.fill : '#000'}
          />
        </svg>
      );
    case 'key':
      return (
        <svg
          width={props.width ? props.width : '30px'}
          height={props.height ? props.height : '30px'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill={props.fill ? props.fill : '#000'}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.351 1.091a4.528 4.528 0 0 1 3.44 3.16c.215.724.247 1.49.093 2.23a4.583 4.583 0 0 1-4.437 3.6c-.438 0-.874-.063-1.293-.19l-.8.938-.379.175H7v1.5l-.5.5H5v1.5l-.5.5h-3l-.5-.5v-2.307l.146-.353L6.12 6.87a4.464 4.464 0 0 1-.2-1.405 4.528 4.528 0 0 1 5.431-4.375zm1.318 7.2a3.568 3.568 0 0 0 1.239-2.005l.004.005A3.543 3.543 0 0 0 9.72 2.08a3.576 3.576 0 0 0-2.8 3.4c-.01.456.07.908.239 1.33l-.11.543L2 12.404v1.6h2v-1.5l.5-.5H6v-1.5l.5-.5h1.245l.876-1.016.561-.14a3.47 3.47 0 0 0 1.269.238 3.568 3.568 0 0 0 2.218-.795zm-.838-2.732a1 1 0 1 0-1.662-1.11 1 1 0 0 0 1.662 1.11z"
          />
        </svg>
      );
    case 'trash':
      return (
        <svg
          width={props.width ? props.width : '30px'}
          height={props.height ? props.height : '30px'}
          viewBox="0 0 1024 1024"
          className="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M692.2 182.2V72.9H327.8v109.3H145.6v72.9h728.8v-72.9H692.2z m-291.5 0v-36.4h218.6v36.4H400.7zM730.8 874.5H289.2l-34.3-548.8-72.8 4.5 38.6 617.2h578.6l38.6-617.2-72.8-4.5z"
            fill={props.fill ? props.fill : '#000'}
          />
          <path
            d="M400.7 400.8h72.9v437.3h-72.9zM546.4 400.8h72.9v437.3h-72.9z"
            fill={props.fill ? props.fill : '#000'}
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
    // case 'rectangleNode':
    //   return (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="200"
    //       height="140"
    //       viewBox="0 0 200 140"
    //     >
    //       <rect
    //         x="20"
    //         y="20"
    //         width="160"
    //         height="100"
    //         fill="none"
    //         stroke="#000"
    //         strokeWidth="1"
    //       />
    //       <marker
    //         id={`${props.etcType}1`}
    //         viewBox="0 0 10 10"
    //         refX="5"
    //         refY="5"
    //         markerWidth="5"
    //         markerHeight="5"
    //         orient="auto-start-reverse"
    //       >
    //         <path
    //           d="M 0 0 L 10 5 L 0 10 z"
    //           fill={props.top ? '#000' : '#aaa'}
    //         />
    //       </marker>
    //       <marker
    //         id={`${props.etcType}2`}
    //         viewBox="0 0 10 10"
    //         refX="5"
    //         refY="5"
    //         markerWidth="5"
    //         markerHeight="5"
    //         orient="auto-start-reverse"
    //       >
    //         <path
    //           d="M 0 0 L 10 5 L 0 10 z"
    //           fill={props.left ? '#000' : '#aaa'}
    //         />
    //       </marker>
    //       <marker
    //         id={`${props.etcType}3`}
    //         viewBox="0 0 10 10"
    //         refX="5"
    //         refY="5"
    //         markerWidth="5"
    //         markerHeight="5"
    //         orient="auto-start-reverse"
    //       >
    //         <path
    //           d="M 0 0 L 10 5 L 0 10 z"
    //           fill={props.bottom ? '#000' : '#aaa'}
    //         />
    //       </marker>
    //       <marker
    //         id={`${props.etcType}4`}
    //         viewBox="0 0 10 10"
    //         refX="5"
    //         refY="5"
    //         markerWidth="5"
    //         markerHeight="5"
    //         orient="auto-start-reverse"
    //       >
    //         <path
    //           d="M 0 0 L 10 5 L 0 10 z"
    //           fill={props.right ? '#000' : '#aaa'}
    //         />
    //       </marker>
    //       <line
    //         x1="100"
    //         y1={props.top ? '10' : '30'}
    //         x2="100"
    //         y2={props.top ? '30' : '10'}
    //         stroke={props.top ? '#000' : '#aaa'}
    //         strokeWidth="2"
    //         markerEnd={`url(#${props.etcType}1)`}
    //       />
    //       <line
    //         xmlns="http://www.w3.org/2000/svg"
    //         x1={props.left ? '10' : '30'}
    //         y1="70"
    //         x2={props.left ? '30' : '10'}
    //         y2="70"
    //         stroke={props.left ? '#000' : '#aaa'}
    //         strokeWidth="2"
    //         markerEnd={`url(#${props.etcType}2)`}
    //       />
    //       <line
    //         x1="100"
    //         y1={props.bottom ? '130' : '110'}
    //         x2="100"
    //         y2={props.bottom ? '110' : '130'}
    //         stroke={props.bottom ? '#000' : '#aaa'}
    //         strokeWidth="2"
    //         markerEnd={`url(#${props.etcType}3)`}
    //       />
    //       <line
    //         xmlns="http://www.w3.org/2000/svg"
    //         x1={props.right ? '190' : '170'}
    //         y1="70"
    //         x2={props.right ? '170' : '190'}
    //         y2="70"
    //         stroke={props.right ? '#000' : '#aaa'}
    //         strokeWidth="2"
    //         markerEnd={`url(#${props.etcType}4)`}
    //       />
    //     </svg>
    //   );
    // case 'diamondNode':
    //   return (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="160"
    //       height="100"
    //       viewBox="0 0 160 100"
    //     >
    //       <rect x="0" y="0" width="160" height="100" fill="none" />
    //       <path
    //         d="M20,50 L80,20 L140,50 L80,80 Z"
    //         fill="#fff"
    //         stroke="#000"
    //         strokeWidth="1"
    //       />
    //       <marker
    //         id={`${props.etcType}1`}
    //         viewBox="0 0 10 10"
    //         refX="5"
    //         refY="5"
    //         markerWidth="4"
    //         markerHeight="4"
    //         orient="auto-start-reverse"
    //       >
    //         <path
    //           d="M 0 0 L 10 5 L 0 10 z"
    //           fill={props.top ? '#000' : '#aaa'}
    //         />
    //       </marker>
    //       <marker
    //         id={`${props.etcType}2`}
    //         viewBox="0 0 10 10"
    //         refX="5"
    //         refY="5"
    //         markerWidth="4"
    //         markerHeight="4"
    //         orient="auto-start-reverse"
    //       >
    //         <path
    //           d="M 0 0 L 10 5 L 0 10 z"
    //           fill={props.left ? '#000' : '#aaa'}
    //         />
    //       </marker>
    //       <marker
    //         id={`${props.etcType}3`}
    //         viewBox="0 0 10 10"
    //         refX="5"
    //         refY="5"
    //         markerWidth="4"
    //         markerHeight="4"
    //         orient="auto-start-reverse"
    //       >
    //         <path
    //           d="M 0 0 L 10 5 L 0 10 z"
    //           fill={props.bottom ? '#000' : '#aaa'}
    //         />
    //       </marker>
    //       <marker
    //         id={`${props.etcType}4`}
    //         viewBox="0 0 10 10"
    //         refX="5"
    //         refY="5"
    //         markerWidth="4"
    //         markerHeight="4"
    //         orient="auto-start-reverse"
    //       >
    //         <path
    //           d="M 0 0 L 10 5 L 0 10 z"
    //           fill={props.right ? '#000' : '#aaa'}
    //         />
    //       </marker>
    //       <line
    //         x1="80"
    //         y1={props.top ? '10' : '30'}
    //         x2="80"
    //         y2={props.top ? '30' : '10'}
    //         stroke={props.top ? '#000' : '#aaa'}
    //         strokeWidth="2"
    //         markerEnd={`url(#${props.etcType}1)`}
    //       />
    //       <line
    //         xmlns="http://www.w3.org/2000/svg"
    //         x1={props.left ? '10' : '35'}
    //         y1="50"
    //         x2={props.left ? '35' : '10'}
    //         y2="50"
    //         stroke={props.left ? '#000' : '#aaa'}
    //         strokeWidth="2"
    //         markerEnd={`url(#${props.etcType}2)`}
    //       />
    //       <line
    //         x1="80"
    //         y1={props.bottom ? '90' : '70'}
    //         x2="80"
    //         y2={props.bottom ? '70' : '90'}
    //         stroke={props.bottom ? '#000' : '#aaa'}
    //         strokeWidth="2"
    //         markerEnd={`url(#${props.etcType}3)`}
    //       />
    //       <line
    //         xmlns="http://www.w3.org/2000/svg"
    //         x1={props.right ? '150' : '125'}
    //         y1="50"
    //         x2={props.right ? '125' : '150'}
    //         y2="50"
    //         stroke={props.right ? '#000' : '#aaa'}
    //         strokeWidth="2"
    //         markerEnd={`url(#${props.etcType}4)`}
    //       />
    //     </svg>
    //   );
    // case 'rectangleNode':
    //   return (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="200"
    //       height="140"
    //       viewBox="0 0 200 140"
    //     >
    //       <rect
    //         x="20"
    //         y="20"
    //         width="160"
    //         height="100"
    //         fill="none"
    //         stroke="#000"
    //         strokeWidth="1"
    //       />
    //       <circle
    //         cx="100"
    //         cy="20"
    //         r="8"
    //         fill={props.fillTop ? props.fillTop : '#aaa'}
    //       />
    //       <circle
    //         cx="20"
    //         cy="70"
    //         r="8"
    //         fill={props.fillLeft ? props.fillLeft : '#aaa'}
    //       />
    //       <circle
    //         cx="100"
    //         cy="120"
    //         r="8"
    //         fill={props.fillBottom ? props.fillBottom : '#aaa'}
    //       />
    //       <circle
    //         cx="180"
    //         cy="70"
    //         r="8"
    //         fill={props.fillRight ? props.fillRight : '#aaa'}
    //       />
    //     </svg>
    //   );
    // case 'diamondNode':
    //   return (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="160"
    //       height="100"
    //       viewBox="0 0 160 100"
    //     >
    //       <rect x="0" y="0" width="160" height="100" fill="none" />
    //       <path
    //         d="M20,50 L80,20 L140,50 L80,80 Z"
    //         fill="#fff"
    //         stroke="#000"
    //         strokeWidth="1"
    //       />
    //       <circle
    //         cx="80"
    //         cy="20"
    //         r="8"
    //         fill={props.fillTop ? props.fillTop : '#aaa'}
    //       />
    //       <circle
    //         cx="20"
    //         cy="50"
    //         r="8"
    //         fill={props.fillLeft ? props.fillLeft : '#aaa'}
    //       />
    //       <circle
    //         cx="80"
    //         cy="80"
    //         r="8"
    //         fill={props.fillBottom ? props.fillBottom : '#aaa'}
    //       />
    //       <circle
    //         cx="140"
    //         cy="50"
    //         r="8"
    //         fill={props.fillRight ? props.fillRight : '#aaa'}
    //       />
    //     </svg>
    //   );
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
