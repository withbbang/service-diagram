import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from 'modules/utils';
import UpdateSequenceDiagramPT from './UpdateSequenceDiagramPT';
import styles from 'components/functionPopup/FunctionPopup.module.scss';
import { useParams } from 'react-router-dom';

const UpdateSequenceDiagramCT = ({
  handleLoaderTrue,
  handleLoaderFalse
}: typeUpdateSequenceDiagramCT): JSX.Element => {
  const db = getFirestore(app);
  const type = 'sequence';
  const { contentId } = useParams();

  const titleRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const contentRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const [isFunctionPopupActive, setIsFunctionPopupActive] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(``);
  const [isDone, setIsDone] = useState<string>('N');
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  useEffect(() => {
    (async () => {
      handleLoaderTrue();
      if (contentId !== undefined) {
        const docSnap = await getDoc(doc(db, type, contentId));

        if (docSnap.exists()) {
          const { title, content, isDone } = docSnap.data();

          setTitle(title);
          setContent(content);
          setIsDone(isDone);
        }
      } else {
        setConfirmMessage('No Document Detail ID!');
        setConfirmPopupActive(true);
      }
      handleLoaderFalse();
    })();
  }, []);

  const handleUpdateBtn = async () => {
    setConfirmMessage('Really Update?');
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
    if (contentId !== undefined) {
      handleLoaderTrue();
      setConfirmMessage('');
      setConfirmPopupActive(false);
      await setDoc(doc(db, type, contentId), {
        title,
        content,
        isDone
      });
      handleLoaderFalse();
    } else {
      setConfirmMessage('No Document Detail ID!');
      setConfirmPopupActive(true);
    }
  };

  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  return (
    <UpdateSequenceDiagramPT
      title={title}
      content={content}
      isFunctionPopupActive={isFunctionPopupActive}
      children={handleChildren}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      onCreateUpdatePopup={handleCreateUpdatePopup}
      onUpdateBtn={handleUpdateBtn}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

interface typeUpdateSequenceDiagramCT {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default UpdateSequenceDiagramCT;
