import React, { useEffect, useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from 'modules/utils';
import CreateSequenceDiagramPT from './CreateSequenceDiagramPT';
import styles from 'components/functionPopup/FunctionPopup.module.scss';

const CreateSequenceDiagramCT = ({
  handleLoaderTrue,
  handleLoaderFalse
}: typeCreateSequenceDiagramCT): JSX.Element => {
  const db = getFirestore(app);
  const type = 'sequence';
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  const titleRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const contentRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const createUpdateBtnRef =
    React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const [isFunctionPopupActive, setIsFunctionPopupActive] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(``);

  useEffect(() => {}, []);

  const handleSaveBtn = async () => {
    setConfirmMessage('Really Save?');
    setConfirmPopupActive(true);
  };

  const handleCreateUpdatePopup = () => {
    setIsFunctionPopupActive(!isFunctionPopupActive);
  };

  const handleTextAreaTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      const el = document.getElementById('content') as HTMLTextAreaElement;

      el.setRangeText('  ', el.selectionStart, el.selectionStart, 'end');
    }
  };

  const handleChildren = (
    <div className={styles.contentBox}>
      <div className={styles.option}>
        <input
          placeholder="TITLE"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // onKeyUp={(e) => handleCreateUpdateContent(e)}
          onKeyUp={(e) => {}}
          ref={titleRef}
        />
        {/* <select
          defaultValue={isDone}
          onChange={(e) => setIsDone(e.target.value)}
        >
          <option value={'N'}>비노출</option>
          <option value={'Y'}>노출</option>
        </select> */}
      </div>
      <textarea
        placeholder="CONTENT"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => handleTextAreaTab(e)}
        ref={contentRef}
      />
      <button onClick={handleCreateUpdatePopup}>확인</button>
    </div>
  );

  const handleConfirm = async () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
    handleLoaderTrue();
    const docRef = await addDoc(collection(db, type), {
      title,
      content
    });
    handleLoaderFalse();
  };

  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  return (
    <CreateSequenceDiagramPT
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

interface typeCreateSequenceDiagramCT {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default CreateSequenceDiagramCT;
