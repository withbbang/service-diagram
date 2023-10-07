import React, { useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { app, auth, handleHasPermission } from 'modules/utils';
import UpdateSequenceDiagramPT from './UpdateSequenceDiagramPT';
import styles from 'components/functionPopup/FunctionPopup.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';

const UpdateSequenceDiagramCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeUpdateSequenceDiagramCT): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const type = 'sequence'; // Firebase 컬렉션 이름
  const { contentId } = useParams();
  const navigate = useNavigate();

  const [uid_, setUid_] = useState<string>(''); // 로그인 여부 판단 훅
  const [grade, setGrade] = useState<number | undefined>(); // 로그인 사용자 등급
  const [title, setTitle] = useState<string>(''); // 다이어그램 제목
  const [content, setContent] = useState<string>(``); // 다이어그램 내용
  const [isDone, setIsDone] = useState<string>('N'); // 완료 여부
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅
  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅

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
    try {
      if (uid !== undefined && uid !== null && uid !== '') {
        handleCheckAuthStateChanged();
      } else {
        throw Error('No User');
      }
    } catch (error: any) {
      setUid_('');
      setErrorMessage(error.message);
      setErrorPopupActive(true);
    }
  }, [uid]);

  // 상태저장된 로그인 정보와 서버에 저장된 정보가 동일한지 확인하는 함수
  const handleCheckAuthStateChanged = () => {
    handleLoaderTrue();
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUid_(user.uid);

          const docSnap = await getDoc(doc(db, 'authority', user.uid));

          if (docSnap !== undefined && docSnap.exists()) {
            const { grade, corporate } = docSnap.data();
            setGrade(grade);

            if (!handleHasPermission(['u'], grade)) {
              throw Error("You Don't Have Permission");
            } else {
              await handleSetContent(corporate);
            }
          } else {
            throw Error('No User Grade');
          }
        } else {
          throw Error('No User');
        }
      } catch (error: any) {
        setUid_('');
        setErrorMessage(error.message);
        setErrorPopupActive(true);
      } finally {
        handleLoaderFalse();
      }
    });
  };

  // 업데이트 버튼
  const handleUpdateBtn = async () => {
    setConfirmMessage('Really Update?');
    setConfirmPopupActive(true);
  };

  // 기능 팝업 활성 제어 함수
  const handleUpdatePopup = () => {
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
      {handleHasPermission(['u'], grade) && (
        <div className={styles.options}>
          <div className={styles.option}>
            <label>Title</label>
            <input
              placeholder="TITLE"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
            />
          </div>
          <div className={styles.option}>
            <label>Complete</label>
            <select value={isDone} onChange={(e) => setIsDone(e.target.value)}>
              <option value={'N'}>N</option>
              <option value={'Y'}>Y</option>
            </select>
          </div>
        </div>
      )}
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

  // 초기 다이어그램 불러오기
  const handleSetContent = async (corp?: string) => {
    if (contentId !== undefined) {
      let docSnap;

      try {
        docSnap = await getDoc(doc(db, type, contentId));
      } catch (error) {
        console.error(error);
        throw Error('Data Fetching Error');
      }

      if (docSnap !== undefined && docSnap.exists()) {
        const { title, content, isDone, corporate } = docSnap.data();

        if (corp === 'ALL' || corporate === corp) {
          setTitle(title);
          setContent(content);
          setIsDone(isDone);
        } else {
          throw Error("You Don't Have Permission");
        }
      } else {
        throw Error('No Content');
      }
    } else {
      throw Error('No Document Detail ID!');
    }
  };

  // confirm 팝업 확인 버튼
  const handleConfirm = async () => {
    if (contentId !== undefined) {
      setConfirmMessage('');
      setConfirmPopupActive(false);
      handleLoaderTrue();
      try {
        await updateDoc(doc(db, type, contentId), {
          title,
          content,
          isDone,
          updateDt: serverTimestamp()
        });

        navigate(`/diagram/${type}/${contentId}`);
      } catch (error) {
        console.error(error);
        setErrorMessage('Data Updating Error');
        setErrorPopupActive(true);
      } finally {
        handleLoaderFalse();
      }
    } else {
      setErrorMessage('No Document Detail ID!');
      setErrorPopupActive(true);
    }
  };

  // confirm 팝업 취소 버튼
  const handleCancel = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  // error 팝업 확인 버튼
  const handleErrorPopup = () => {
    navigate(-1);
  };

  return (
    <UpdateSequenceDiagramPT
      uid={uid}
      uid_={uid_}
      title={title}
      content={content}
      isFunctionPopupActive={isFunctionPopupActive}
      children={handleChildren}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
      onUpdatePopup={handleUpdatePopup}
      onUpdateBtn={handleUpdateBtn}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onErrorPopup={handleErrorPopup}
    />
  );
};

interface typeUpdateSequenceDiagramCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default UpdateSequenceDiagramCT;
