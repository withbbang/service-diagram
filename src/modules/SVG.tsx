import { typeSVG } from './types';

const SVG = (props: typeSVG): JSX.Element => {
  switch (props.type) {
    case 'time':
      return (
        <svg
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
            fill={props.fill ? props.fill : '#000'}
          />
          <path
            d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
            fill={props.fill ? props.fill : '#000'}
          />
        </svg>
      );
    case 'authority':
      return (
        <svg
          fill={props.fill ? props.fill : '#000'}
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <g>
            <g>
              <g>
                <path
                  d="M501.331,95.997H10.669C4.777,95.997,0,100.774,0,106.666v298.668c0,5.892,4.777,10.669,10.669,10.669h490.662
				c5.892,0,10.669-4.776,10.669-10.669V106.666C512,100.774,507.225,95.997,501.331,95.997z M490.663,394.665H21.337V117.335
				h469.325V394.665z"
                />
                <path
                  d="M133.155,330.669c17.39,0,37.38-10.051,52.17-26.231c12.897-14.108,28.27-39.649,28.27-81.203v-36.42
				c0-4.829-3.243-9.056-7.907-10.305c-23.01-6.166-45.619-15.608-67.199-28.068c-3.302-1.906-7.367-1.905-10.67,0
				c-21.269,12.281-44.505,21.986-67.196,28.068c-4.663,1.25-7.906,5.476-7.906,10.305v36.42c0,41.554,15.372,67.095,28.268,81.203
				C95.775,320.618,115.765,330.669,133.155,330.669z M74.055,194.872c20.017-6.016,40.202-14.533,59.097-24.941
				c19.095,10.539,38.919,18.906,59.106,24.947v28.356c0,60.842-38.494,86.097-59.103,86.097c-20.608,0-59.099-25.255-59.099-86.097
				v-28.362H74.055z"
                />
                <path
                  d="M144.923,351.998H90.485c-5.891,0-10.669,4.776-10.669,10.669c0,5.892,4.777,10.669,10.669,10.669h54.437
				c5.892,0,10.669-4.776,10.669-10.669C155.592,356.774,150.815,351.998,144.923,351.998z"
                />
                <path
                  d="M175.825,352.002h-0.256c-5.892,0-10.669,4.776-10.669,10.669s4.776,10.669,10.669,10.669h0.256
				c5.891,0,10.669-4.776,10.669-10.669S181.716,352.002,175.825,352.002z"
                />
                <path
                  d="M277.668,185.512h147.836c5.891,0,10.669-4.776,10.669-10.669s-4.777-10.669-10.669-10.669H277.668
				c-5.891,0-10.669,4.776-10.669,10.669S271.775,185.512,277.668,185.512z"
                />
                <path
                  d="M277.668,270.843h147.836c5.891,0,10.669-4.776,10.669-10.669c0-5.892-4.777-10.669-10.669-10.669H277.668
				c-5.891,0-10.669,4.776-10.669,10.669C266.999,266.066,271.775,270.843,277.668,270.843z"
                />
                <path
                  d="M277.668,313.507h147.836c5.891,0,10.669-4.776,10.669-10.669c0-5.892-4.777-10.669-10.669-10.669H277.668
				c-5.891,0-10.669,4.776-10.669,10.669C266.999,308.731,271.775,313.507,277.668,313.507z"
                />
                <path
                  d="M308.566,206.839c-5.892,0-10.669,4.776-10.669,10.669s4.776,10.669,10.669,10.669h116.937
				c5.891,0,10.669-4.776,10.669-10.669s-4.776-10.669-10.669-10.669H308.566z"
                />
                <path
                  d="M277.668,228.179h0.254c5.892,0,10.669-4.776,10.669-10.669s-4.776-10.669-10.669-10.669h-0.254
				c-5.891,0-10.669,4.776-10.669,10.669S271.775,228.179,277.668,228.179z"
                />
                <path
                  d="M425.503,351.998h-54.437c-5.892,0-10.669,4.776-10.669,10.669c0,5.892,4.776,10.669,10.669,10.669h54.437
				c5.891,0,10.669-4.776,10.669-10.669C436.172,356.774,431.396,351.998,425.503,351.998z"
                />
              </g>
            </g>
          </g>
        </svg>
      );
    case 'user':
      return (
        <svg
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12.25C11.2583 12.25 10.5333 12.0301 9.91661 11.618C9.29993 11.206 8.81928 10.6203 8.53545 9.93506C8.25163 9.24984 8.17736 8.49584 8.32206 7.76841C8.46675 7.04098 8.8239 6.3728 9.34835 5.84835C9.8728 5.3239 10.541 4.96675 11.2684 4.82206C11.9958 4.67736 12.7498 4.75162 13.4351 5.03545C14.1203 5.31928 14.706 5.79993 15.118 6.41661C15.5301 7.0333 15.75 7.75832 15.75 8.5C15.75 9.49456 15.3549 10.4484 14.6517 11.1517C13.9484 11.8549 12.9946 12.25 12 12.25ZM12 6.25C11.555 6.25 11.12 6.38196 10.75 6.62919C10.38 6.87643 10.0916 7.22783 9.92127 7.63896C9.75098 8.0501 9.70642 8.5025 9.79323 8.93895C9.88005 9.37541 10.0943 9.77632 10.409 10.091C10.7237 10.4057 11.1246 10.62 11.561 10.7068C11.9975 10.7936 12.4499 10.749 12.861 10.5787C13.2722 10.4084 13.6236 10.12 13.8708 9.75003C14.118 9.38002 14.25 8.94501 14.25 8.5C14.25 7.90326 14.0129 7.33097 13.591 6.90901C13.169 6.48705 12.5967 6.25 12 6.25Z"
            fill={props.fill ? props.fill : '#000'}
          />
          <path
            d="M19 19.25C18.8019 19.2474 18.6126 19.1676 18.4725 19.0275C18.3324 18.8874 18.2526 18.6981 18.25 18.5C18.25 16.55 17.19 15.25 12 15.25C6.81 15.25 5.75 16.55 5.75 18.5C5.75 18.6989 5.67098 18.8897 5.53033 19.0303C5.38968 19.171 5.19891 19.25 5 19.25C4.80109 19.25 4.61032 19.171 4.46967 19.0303C4.32902 18.8897 4.25 18.6989 4.25 18.5C4.25 13.75 9.68 13.75 12 13.75C14.32 13.75 19.75 13.75 19.75 18.5C19.7474 18.6981 19.6676 18.8874 19.5275 19.0275C19.3874 19.1676 19.1981 19.2474 19 19.25Z"
            fill={props.fill ? props.fill : '#000'}
          />
        </svg>
      );
    case 'hammer':
      return (
        <svg
          fill={props.fill ? props.fill : '#000'}
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M280.16,242.79l-26.11-26.12a32,32,0,0,0-45.14-.12L27.38,384.08c-6.61,6.23-10.95,14.17-11.35,23.06a32.11,32.11,0,0,0,9.21,23.94l39,39.43a.46.46,0,0,0,.07.07A32.29,32.29,0,0,0,87,480l1.18,0c8.89-.33,16.85-4.5,23.17-11.17l168.7-180.7A32,32,0,0,0,280.16,242.79Z" />
          <path d="M490,190l-.31-.31-34.27-33.92a21.46,21.46,0,0,0-15.28-6.26,21.89,21.89,0,0,0-12.79,4.14c0-.43.06-.85.09-1.22.45-6.5,1.15-16.32-5.2-25.22a258,258,0,0,0-24.8-28.74.6.6,0,0,0-.08-.08c-13.32-13.12-42.31-37.83-86.72-55.94A139.55,139.55,0,0,0,257.56,32C226,32,202,46.24,192.81,54.68A119.92,119.92,0,0,0,178.63,70.9a16,16,0,0,0,18.65,24.34,74.45,74.45,0,0,1,8.58-2.63,63.46,63.46,0,0,1,18.45-1.15C237.5,92.55,253.1,99.1,260,104.55c11.7,9.41,17.33,22.09,18.26,41.09.18,3.82-7.72,18.14-20,34.48a16,16,0,0,0,1.45,21l34.41,34.41a16,16,0,0,0,22,.62c9.73-8.69,24.55-21.79,29.73-25,7.69-4.73,13.19-5.64,14.7-5.8a19.18,19.18,0,0,1,11.29,2.38,1.24,1.24,0,0,1-.31.95l-1.82,1.73-.3.28a21.52,21.52,0,0,0,.05,30.54l34.26,33.91A21.45,21.45,0,0,0,419,281.39a21.7,21.7,0,0,0,15.22-6.2l55.5-54.82c.19-.19.38-.39.56-.59A21.87,21.87,0,0,0,490,190Z" />
        </svg>
      );
    case 'notFound':
      return (
        <svg
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          viewBox="-20 10 190 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M38.155 140.475L48.988 62.1108L92.869 67.0568L111.437 91.0118L103.396 148.121L38.155 140.475ZM84.013 94.0018L88.827 71.8068L54.046 68.3068L44.192 135.457L98.335 142.084L104.877 96.8088L84.013 94.0018ZM59.771 123.595C59.394 123.099 56.05 120.299 55.421 119.433C64.32 109.522 86.05 109.645 92.085 122.757C91.08 123.128 86.59 125.072 85.71 125.567C83.192 118.25 68.445 115.942 59.771 123.595ZM76.503 96.4988L72.837 99.2588L67.322 92.6168L59.815 96.6468L56.786 91.5778L63.615 88.1508L59.089 82.6988L64.589 79.0188L68.979 85.4578L76.798 81.5328L79.154 86.2638L72.107 90.0468L76.503 96.4988Z"
            fill="#000000"
          />
        </svg>
      );
    case 'back':
      return (
        <svg
          fill={props.fill ? props.fill : '#000'}
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          enableBackground="new 0 0 52 52"
          xmlSpace="preserve"
        >
          <path
            d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c0.6-0.6,0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0
	L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29
	h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z"
          />
        </svg>
      );
    case 'company':
      return (
        <svg
          fill={props.fill ? props.fill : '#000'}
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path d="M8 2L8 6L4 6L4 48L46 48L46 14L30 14L30 6L26 6L26 2 Z M 10 4L24 4L24 8L28 8L28 46L19 46L19 39L15 39L15 46L6 46L6 8L10 8 Z M 10 10L10 12L12 12L12 10 Z M 14 10L14 12L16 12L16 10 Z M 18 10L18 12L20 12L20 10 Z M 22 10L22 12L24 12L24 10 Z M 10 15L10 19L12 19L12 15 Z M 14 15L14 19L16 19L16 15 Z M 18 15L18 19L20 19L20 15 Z M 22 15L22 19L24 19L24 15 Z M 30 16L44 16L44 46L30 46 Z M 32 18L32 20L34 20L34 18 Z M 36 18L36 20L38 20L38 18 Z M 40 18L40 20L42 20L42 18 Z M 10 21L10 25L12 25L12 21 Z M 14 21L14 25L16 25L16 21 Z M 18 21L18 25L20 25L20 21 Z M 22 21L22 25L24 25L24 21 Z M 32 22L32 24L34 24L34 22 Z M 36 22L36 24L38 24L38 22 Z M 40 22L40 24L42 24L42 22 Z M 32 26L32 28L34 28L34 26 Z M 36 26L36 28L38 28L38 26 Z M 40 26L40 28L42 28L42 26 Z M 10 27L10 31L12 31L12 27 Z M 14 27L14 31L16 31L16 27 Z M 18 27L18 31L20 31L20 27 Z M 22 27L22 31L24 31L24 27 Z M 32 30L32 32L34 32L34 30 Z M 36 30L36 32L38 32L38 30 Z M 40 30L40 32L42 32L42 30 Z M 10 33L10 37L12 37L12 33 Z M 14 33L14 37L16 37L16 33 Z M 18 33L18 37L20 37L20 33 Z M 22 33L22 37L24 37L24 33 Z M 32 34L32 36L34 36L34 34 Z M 36 34L36 36L38 36L38 34 Z M 40 34L40 36L42 36L42 34 Z M 32 38L32 40L34 40L34 38 Z M 36 38L36 40L38 40L38 38 Z M 40 38L40 40L42 40L42 38 Z M 10 39L10 44L12 44L12 39 Z M 22 39L22 44L24 44L24 39 Z M 32 42L32 44L34 44L34 42 Z M 36 42L36 44L38 44L38 42 Z M 40 42L40 44L42 44L42 42Z" />
        </svg>
      );
    case 'category':
      return (
        <svg
          fill={props.fill ? props.fill : '#000'}
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          viewBox="0 0 64 64"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlSpace="preserve"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <rect
            id="Icons"
            x="-384"
            y="-320"
            width="1280"
            height="800"
            fill="none"
          />
          <g id="Icons1">
            <g id="Strike"></g>
            <g id="H1"></g>
            <g id="H2"></g>
            <g id="H3"></g>
            <g id="list-ul"></g>
            <g id="hamburger-1"></g>
            <g id="hamburger-2"></g>
            <g id="list-ol"></g>
            <g id="list-task"></g>
            <g id="trash"></g>
            <g id="vertical-menu"></g>
            <g id="horizontal-menu"></g>
            <g id="sidebar-2"></g>
            <g id="Pen"></g>
            <g id="Pen1"></g>
            <g id="clock"></g>
            <g id="external-link"></g>
            <g id="hr"></g>
            <g id="info"></g>
            <g id="warning"></g>
            <g id="plus-circle"></g>
            <g id="minus-circle"></g>
            <g id="vue"></g>
            <g id="cog"></g>
            <g id="logo"></g>
            <g id="radio-check"></g>
            <g id="eye-slash"></g>
            <g id="eye"></g>
            <g id="toggle-off"></g>
            <g id="shredder"></g>
            <g>
              <path d="M9.89,30.496c-1.14,1.122 -1.784,2.653 -1.791,4.252c-0.006,1.599 0.627,3.135 1.758,4.266c3.028,3.028 7.071,7.071 10.081,10.082c2.327,2.326 6.093,2.349 8.448,0.051c5.91,-5.768 16.235,-15.846 19.334,-18.871c0.578,-0.564 0.905,-1.338 0.905,-2.146c0,-4.228 0,-17.607 0,-17.607l-17.22,0c-0.788,0 -1.544,0.309 -2.105,0.862c-3.065,3.018 -13.447,13.239 -19.41,19.111Zm34.735,-15.973l0,11.945c0,0.811 -0.329,1.587 -0.91,2.152c-3.069,2.981 -13.093,12.718 -17.485,16.984c-1.161,1.127 -3.012,1.114 -4.157,-0.031c-2.387,-2.386 -6.296,-6.296 -8.709,-8.709c-0.562,-0.562 -0.876,-1.325 -0.872,-2.12c0.003,-0.795 0.324,-1.555 0.892,-2.112c4.455,-4.373 14.545,-14.278 17.573,-17.25c0.561,-0.551 1.316,-0.859 2.102,-0.859c3.202,0 11.566,0 11.566,0Zm-7.907,2.462c-1.751,0.015 -3.45,1.017 -4.266,2.553c-0.708,1.331 -0.75,2.987 -0.118,4.356c0.836,1.812 2.851,3.021 4.882,2.809c2.042,-0.212 3.899,-1.835 4.304,-3.896c0.296,-1.503 -0.162,-3.136 -1.213,-4.251c-0.899,-0.953 -2.18,-1.548 -3.495,-1.57c-0.031,-0.001 -0.062,-0.001 -0.094,-0.001Zm0.008,2.519c1.105,0.007 2.142,0.849 2.343,1.961c0.069,0.384 0.043,0.786 -0.09,1.154c-0.393,1.079 -1.62,1.811 -2.764,1.536c-1.139,-0.274 -1.997,-1.489 -1.802,-2.67c0.177,-1.069 1.146,-1.963 2.27,-1.981c0.014,0 0.029,0 0.043,0Z" />
              <path d="M48.625,13.137l0,4.001l3.362,0l0,11.945c0,0.811 -0.328,1.587 -0.909,2.152c-3.069,2.981 -13.093,12.717 -17.485,16.983c-1.161,1.128 -3.013,1.114 -4.157,-0.03l-0.034,-0.034l-1.016,0.993c-0.663,0.646 -1.437,1.109 -2.259,1.389l1.174,1.174c2.327,2.327 6.093,2.35 8.447,0.051c5.91,-5.768 16.235,-15.845 19.335,-18.87c0.578,-0.565 0.904,-1.339 0.904,-2.147c0,-4.227 0,-17.607 0,-17.607l-7.362,0Z" />{' '}
            </g>
            <g id="spinner--loading--dots-"></g>
            <g id="react"></g>
            <g id="check-selected"></g>
            <g id="turn-off"></g>
            <g id="code-block"></g>
            <g id="user"></g>
            <g id="coffee-bean"></g>
            <g id="coffee-beans">
              <g id="coffee-bean1"></g>
            </g>
            <g id="coffee-bean-filled"></g>
            <g id="coffee-beans-filled">
              <g id="coffee-bean2"></g>
            </g>
            <g id="clipboard"></g>
            <g id="clipboard-paste"></g>
            <g id="clipboard-copy"></g>
            <g id="Layer1"></g>
          </g>
        </svg>
      );
    case 'comment_rect': //사각형
      return (
        <svg
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          fill={props.fill ? props.fill : '#fff'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 8h12v1H6zm0 4h9v-1H6zm16-6.25v8.5A2.753 2.753 0 0 1 19.25 17h-7.087L6 21.481V17H4.75A2.753 2.753 0 0 1 2 14.25v-8.5A2.753 2.753 0 0 1 4.75 3h14.5A2.753 2.753 0 0 1 22 5.75zm-1 0A1.752 1.752 0 0 0 19.25 4H4.75A1.752 1.752 0 0 0 3 5.75v8.5A1.752 1.752 0 0 0 4.75 16H7v3.519L11.837 16h7.413A1.752 1.752 0 0 0 21 14.25z" />
          <path fill="none" d="M0 0h24v24H0z" />
        </svg>
      );
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
    case 'dnd':
      return (
        <svg
          width={props.width ? props.width : '35px'}
          height={props.height ? props.height : '35px'}
          viewBox="0 0 24 24"
          fill={props.fill ? props.fill : '#000'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Interface / Drag_Horizontal">
            <g id="Vector">
              <path
                d="M18 14C17.4477 14 17 14.4477 17 15C17 15.5523 17.4477 16 18 16C18.5523 16 19 15.5523 19 15C19 14.4477 18.5523 14 18 14Z"
                stroke={props.fill ? props.fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14Z"
                stroke={props.fill ? props.fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 14C5.44772 14 5 14.4477 5 15C5 15.5523 5.44772 16 6 16C6.55228 16 7 15.5523 7 15C7 14.4477 6.55228 14 6 14Z"
                stroke={props.fill ? props.fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 8C17.4477 8 17 8.44772 17 9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9C19 8.44772 18.5523 8 18 8Z"
                stroke={props.fill ? props.fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8Z"
                stroke={props.fill ? props.fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8Z"
                stroke={props.fill ? props.fill : '#000'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
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
