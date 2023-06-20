import React, { useEffect, useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app, auth } from 'modules/utils';
import CreateSequenceDiagramPT from './CreateSequenceDiagramPT';
import styles from 'components/functionPopup/FunctionPopup.module.scss';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';

const CreateSequenceDiagramCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeCreateSequenceDiagramCT): JSX.Element => {
  const db = getFirestore(app);
  const type = 'sequence';

  const [uid_, setUid_] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(``);
  const [isDone, setIsDone] = useState<string>('N');
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  const titleRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const contentRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const [isFunctionPopupActive, setIsFunctionPopupActive] =
    useState<boolean>(false);

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
      <button onClick={handleCreateUpdatePopup}>확인</button>
    </div>
  );

  const handleConfirm = async () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
    handleLoaderTrue();
    await addDoc(collection(db, type), {
      title,
      content,
      isDone
    });
    handleLoaderFalse();
  };

  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  return (
    <CreateSequenceDiagramPT
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

interface typeCreateSequenceDiagramCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default CreateSequenceDiagramCT;
