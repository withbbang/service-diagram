import React, { useEffect, useState } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { app, auth, handleConvertTimestamp } from 'modules/utils';
import {
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
  const db = getFirestore(app); // Firebase 객체
  const types = ['sequence', 'flow', 'entity-relationship']; // 다이어그램 타입들

  const [uid_, setUid_] = useState<string>(''); // 로그인 여부 판단 훅
  const [snippet, setSnippet] = useState<string>(''); // 검색어
  const [didSearch, setDidSearch] = useState<boolean>(false); // 검색 여부
  const [contents, setContents] = useState<Array<any>>([]); // 선택한 다이어그램들 배열 훅
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅

  const snippetRef = React.useRef() as React.MutableRefObject<HTMLInputElement>; // 검색 input 접근 객체

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

  // 로그인 여부에 따른 다이어그램들 가져오기
  const handleGetContents = async () => {
    handleLoaderTrue();
    try {
      const queries =
        uid !== undefined &&
        uid !== null &&
        uid !== '' &&
        uid_ !== '' &&
        uid === uid_
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
            ] // 로그인 O
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
        queries.map(async ({ type, query }) => {
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
                const { title, createDt } = doc.data();

                return {
                  id: doc.id,
                  title,
                  type,
                  createDt: handleConvertTimestamp(createDt.toDate(), 'date')
                };
              })
              .filter((data) => data.title.includes(snippet))
          ];
        });
      });
    } catch (error) {
      console.error(error);
      setConfirmMessage('Data Fetching Error');
      setConfirmPopupActive(true);
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
      setConfirmMessage('No Search Word');
      setConfirmPopupActive(true);
      handleBlur();
      return;
    }

    setContents([]);
    handleGetContents();
    setDidSearch(true);
    handleBlur();
  };

  const handleBlur = () => {
    snippetRef && snippetRef.current.blur();
  };

  // confirm 팝업 취소 버튼
  const handleCancel = () => {
    setConfirmMessage('');
    setConfirmPopupActive(false);
  };

  return (
    <SearchDiagramsPT
      snippet={snippet}
      didSearch={didSearch}
      contents={contents}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      snippetRef={snippetRef}
      onSetSnippet={setSnippet}
      onSearchDiagrams={handleSearchDiagrams}
      onCancel={handleCancel}
    />
  );
};

interface typeSearchDiagramsCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default SearchDiagramsCT;
