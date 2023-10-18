import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/**
 * 11자리 임의의 문자열 반환 함수
 * @returns {string}
 */
export function handleRandomString(): string {
  return Math.random().toString(36).slice(2, 13);
}

/**
 * YYYY-MM-DD HH:mm:SS 형식 시간 반환 함수
 * @param {string} timestamp
 * @param {string} type
 * @returns {string}
 */
export function handleConvertTimestamp(
  timestamp: string,
  type: string
): string {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return type === 'all'
    ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    : type === 'date'
    ? `${year}-${month}-${day}`
    : `${hours}:${minutes}:${seconds}`;
}

/**
 * 유저 권한 검증 함수
 * @param {string} permissionsParam
 * @param {number | undefined} grade
 * @returns {boolean}
 */
export function handleHasPermission(
  permissionsParam: string,
  grade?: number
): boolean {
  // 게시물 및 유저 관리 권한
  const permissions: { [key: number]: string } = {
    0: 'crudm', // create, read, update, delete, modify member
    5: 'crud', // create, read, update, delete
    10: 'cr', // create, read
    15: 'r', // read
    20: '' // no permission
  };

  if (grade !== undefined) {
    const valueOfPermission = permissions[grade];

    return [...permissionsParam].every((permission) =>
      valueOfPermission.includes(permission)
    );
  } else {
    return false;
  }
}

export const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APP_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});

export const auth = getAuth(app);
