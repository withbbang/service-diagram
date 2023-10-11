import React, { useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
  query,
  getDocs
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { app, auth, handleHasPermission } from 'modules/utils';
import CreateSequenceDiagramPT from './CreateSequenceDiagramPT';
import styles from 'components/functionPopup/FunctionPopup.module.scss';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';

const CreateSequenceDiagramCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeCreateSequenceDiagramCT): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const type = 'sequence'; // Firebase 컬렉션 이름
  const navigate = useNavigate();

  const [grade, setGrade] = useState<number | undefined>(); // 로그인 사용자 등급
  const [title, setTitle] = useState<string>(''); // 다이어그램 제목
  const [content, setContent] = useState<string>(`
    Title: How To Use
    A->B: Normal line
    B-->C: Dashed line
    C->>D: Open arrow
    D-->>A: Dashed open arrow
    Note left of A: Note to the left of A
    Note right of A: Note to the right of A
    Note over A: Note over A
    Note over A, B: Note over both A and B

    # https://bramp.github.io/js-sequence-diagrams 문법 참고
  `); // 다이어그램 내용
  const [isDone, setIsDone] = useState<string>('N'); // 완료 여부
  const [company, setCompany] = useState<string>('ALL'); // 회사 이름
  const [companies, setCompanies] = useState<Array<string>>([]); // 회사 이름들
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
    if (uid !== undefined && uid !== null && uid !== '') {
      handleLoaderTrue();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docSnap = await getDoc(doc(db, 'authority', user.uid));

          if (docSnap !== undefined && docSnap.exists())
            setGrade(docSnap.data().grade);
        }

        handleLoaderFalse();
      });
    }
  }, [uid]);

  // 유저 권한에 따른 초기 회사 목록 가져오기
  useEffect(() => {
    handleHasPermission(['c'], grade) && handleGetCompanies();
  }, [grade]);

  // 회사 목록 가져오기
  const handleGetCompanies = async () => {
    handleLoaderTrue();

    try {
      const q = query(collection(db, 'company'));
      const querySnapshot = await getDocs(q);

      setCompanies(querySnapshot.docs.map((doc) => doc.data().name));
    } catch (error) {
      console.error(error);
      setErrorMessage('Data Fetching Error');
      setErrorPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

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
      {handleHasPermission(['c'], grade) && (
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
            <label>Companie</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              {companies.map((company, idx) => (
                <option key={idx} value={company}>
                  {company}
                </option>
              ))}
            </select>
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

  // confirm 팝업 확인 버튼
  const handleConfirm = async () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
    handleLoaderTrue();
    try {
      const { id } = await addDoc(collection(db, type), {
        title,
        content,
        isDone,
        createDt: serverTimestamp(),
        updateDt: ''
      });

      navigate(`/diagram/${type}/${id}`, { replace: true });
    } catch (error) {
      console.error(error);
      setErrorMessage('Data Saving Error');
      setErrorPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

  // confirm 팝업 취소 버튼
  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  // error 팝업 확인 버튼
  const handleErrorPopup = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <CreateSequenceDiagramPT
      grade={grade}
      title={title}
      content={content}
      isFunctionPopupActive={isFunctionPopupActive}
      children={handleChildren}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
      onCreateUpdatePopup={handleCreateUpdatePopup}
      onSaveBtn={handleSaveBtn}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onErrorPopup={handleErrorPopup}
      onBack={handleBack}
    />
  );
};

interface typeCreateSequenceDiagramCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default CreateSequenceDiagramCT;
