import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import {
  app,
  auth,
  handleConvertTimestamp,
  handleHasPermission
} from 'modules/utils';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import SearchDiagramsPT from './SearchDiagramsPT';

const SearchDiagramsCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeSearchDiagramsCT): JSX.Element => {
  const navigate = useNavigate(); // router 제어 훅
  const db = getFirestore(app); // Firebase 객체
  const types = ['sequence', 'flow', 'entity-relationship', 'mermaid']; // 다이어그램 타입들

  const [uid_, setUid_] = useState<string>(''); // 로그인 여부 판단 훅
  const [grade, setGrade] = useState<number | undefined>(); // 로그인 사용자 등급
  const [company, setCompany] = useState<string>('');
  const [snippet, setSnippet] = useState<string>(''); // 검색어
  const [didSearch, setDidSearch] = useState<boolean>(false); // 검색 여부
  const [contents, setContents] = useState<Array<any>>([]); // 선택한 다이어그램들 배열 훅
  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅

  const snippetRef = React.useRef() as React.MutableRefObject<HTMLInputElement>; // 검색 input 접근 객체

  // 로그인 여부 판단 훅
  useEffect(() => {
    try {
      if (uid !== undefined && uid !== null && uid !== '') {
        handleLoaderTrue();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUid_(user.uid);
            const docSnap = await getDoc(doc(db, 'authority', user.uid));

            if (docSnap !== undefined && docSnap.exists()) {
              const { grade, company } = docSnap.data();

              setGrade(grade);
              setCompany(company);
            }
          }
        });
      }
    } catch (error: any) {
      setUid_('');
      setGrade(20);
    } finally {
      handleLoaderFalse();
    }
  }, [uid]);

  // 로그인 여부에 따른 다이어그램들 가져오기
  const handleGetContents = async () => {
    handleLoaderTrue();
    try {
      const q =
        uid !== undefined &&
        uid !== null &&
        uid !== '' &&
        uid_ !== '' &&
        uid === uid_ &&
        handleHasPermission(['r'], grade) // 로그인 O
          ? company === 'ALL'
            ? [
                ...types.map((type) => {
                  return {
                    type,
                    query: query(
                      collection(db, type),
                      orderBy('createDt', 'desc')
                    )
                  };
                })
              ] // 전체 보기
            : [
                ...types.map((type) => {
                  return {
                    type,
                    query: query(
                      collection(db, type),
                      where('company', 'in', ['ALL', company]),
                      orderBy('createDt', 'desc')
                    )
                  };
                })
              ] // 특정 기업만 보기
          : [
              ...types.map((type) => {
                return {
                  type,
                  query: query(
                    collection(db, type),
                    where('isDone', '==', 'Y'),
                    orderBy('createDt', 'desc')
                  )
                };
              })
            ]; // 로그인 X

      const querySnapshots = await Promise.all(
        q.map(async ({ type, query }) => {
          return {
            type,
            docs: await getDocs(query)
          };
        })
      );

      querySnapshots.forEach(({ type, docs: { docs } }) => {
        setContents((prevContents) => {
          return [
            ...prevContents,
            ...docs
              .map((doc) => {
                const { title, createDt, createdBy } = doc.data();

                return {
                  id: doc.id,
                  title,
                  type,
                  createdBy,
                  createDt: handleConvertTimestamp(createDt.toDate(), 'date')
                };
              })
              .filter((data) => data.title.includes(snippet))
          ];
        });
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('Data Fetching Error');
      setErrorPopupActive(true);
    } finally {
      handleLoaderFalse();
    }
  };

  const handleSearchDiagrams = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e !== undefined && e.key !== 'Enter') {
      return;
    }

    if (!snippet) {
      setErrorMessage('No Search Word');
      setErrorPopupActive(true);
      handleBlur();
      return;
    }

    setContents([]);
    handleGetContents();
    setDidSearch(true);
    handleBlur();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleBlur = () => {
    snippetRef && snippetRef.current.blur();
  };

  // error 팝업 확인 버튼
  const handleErrorPopup = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
  };

  return (
    <SearchDiagramsPT
      snippet={snippet}
      didSearch={didSearch}
      contents={contents}
      snippetRef={snippetRef}
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
      onSetSnippet={setSnippet}
      onSearchDiagrams={handleSearchDiagrams}
      onBack={handleBack}
      onErrorPopup={handleErrorPopup}
    />
  );
};

interface typeSearchDiagramsCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default SearchDiagramsCT;
