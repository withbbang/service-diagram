import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore';
import { app, auth } from 'modules/utils';
import CreateMermaidPT from './CreateMermaidPT';
import styles from 'components/functionPopup/FunctionPopup.module.scss';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';

const CreateMermaidCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeCreateMermaidCT): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const type = 'mermaid'; // Firebase 컬렉션 이름

  const [uid_, setUid_] = useState<string>(''); // 로그인 여부 판단 훅
  const [title, setTitle] = useState<string>(''); // 다이어그램 제목
  const [content, setContent] = useState<string>(`
  sequenceDiagram
  Site->>mermaid: initialize
  Site->>mermaid: content loaded
  mermaid->>mermaidAPI: init

  # http://mermaid.js.org/syntax/examples.html
  # syntax 카테고리 참고
  `); // 다이어그램 내용
  const [isDone, setIsDone] = useState<string>('N'); // 완료 여부
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  // 다이어그램 제목 input 참조 객체
  const titleRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  // 다이어그램 내용 textarea 참조 객체
  const contentRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  // 기능 팝업 제어 훅
  const [isFunctionPopupActive, setIsFunctionPopupActive] =
    useState<boolean>(false);

  // 로그인 여부 판단 훅
  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      handleLoaderTrue();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid_(user.uid);
        }
        handleLoaderFalse();
      });
    } else {
      setUid_('');
    }
  }, [uid]);

  // 저장 버튼
  const handleSaveBtn = async () => {
    setConfirmMessage('Really Save?');
    setConfirmPopupActive(true);
  };

  // 기능 팝업 활성 제어 함수
  const handleCreateUpdatePopup = () => {
    setIsFunctionPopupActive(!isFunctionPopupActive);
  };

  // textarea 태그에서 탭 눌렀을 시 다음 태그로 넘어가는 것을 방지하는 함수
  const handleTextAreaTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      const el = document.getElementById('content') as HTMLTextAreaElement;

      el.setRangeText('  ', el.selectionStart, el.selectionStart, 'end');
    }
  };

  // 기능 팝업 내부 dom
  const handleChildren = (
    <div className={styles.contentBox}>
      <div className={styles.option}>
        <input
          placeholder="TITLE"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleRef}
        />
        <div className={styles.select}>
          <label>Complete</label>
          <select value={isDone} onChange={(e) => setIsDone(e.target.value)}>
            <option value={'N'}>N</option>
            <option value={'Y'}>Y</option>
          </select>
        </div>
      </div>
      <textarea
        placeholder="CONTENT"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => handleTextAreaTab(e)}
        ref={contentRef}
      />
    </div>
  );

  // confirm 팝업 확인 버튼
  const handleConfirm = async () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
    handleLoaderTrue();
    try {
      await addDoc(collection(db, type), {
        title,
        content,
        isDone,
        createDt: serverTimestamp(),
        updateDt: ''
      });
    } catch (error) {
      console.error(error);
      setConfirmMessage('Data Saving Error');
      setConfirmPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

  // confirm 팝업 취소 버튼
  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  return (
    <CreateMermaidPT
      uid={uid}
      uid_={uid_}
      title={title}
      content={content}
      isFunctionPopupActive={isFunctionPopupActive}
      children={handleChildren}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onCreateUpdatePopup={handleCreateUpdatePopup}
      onSaveBtn={handleSaveBtn}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

interface typeCreateMermaidCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default CreateMermaidCT;
