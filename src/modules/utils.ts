import { initializeApp } from 'firebase/app';

/**
 * 11자리 임의의 문자열 반환 함수
 * @returns {string}
 */
export function handleRandomString(): string {
  return Math.random().toString(36).slice(2, 13);
}

export const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APP_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});
