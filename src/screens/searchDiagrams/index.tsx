import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import {
  CommonState,
  handleLoaderFalse,
  handleLoaderTrue,
  handleSetUid
} from 'middlewares/reduxToolkits/commonSlice';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
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
import styles from './SearchDiagrams.module.scss';
import Card from 'components/card/Card';

const mapStateToProps = (state: PropState): CommonState => {
  return { ...state.common };
};

const mapDispatchToProps = (dispatch: (actionFunction: Action<any>) => any) => {
  return {
    handleLoaderTrue: (): void => {
      dispatch(handleLoaderTrue());
    },
    handleLoaderFalse: (): void => {
      dispatch(handleLoaderFalse());
    },
    handleSetUid: (uid: string): void => {
      dispatch(handleSetUid({ uid }));
    }
  };
};

const SearchDiagrams = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse,
  handleSetUid
}: typeSearchDiagrams): JSX.Element => {
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
              ...types.map((type) =>
                query(collection(db, type), orderBy('createDt', 'desc'))
              )
            ] // 로그인 O
          : [
              ...types.map((type) =>
                query(
                  collection(db, type),
                  where('isDone', '==', 'Y'),
                  orderBy('createDt', 'desc')
                )
              )
            ]; // 로그인 X

      const querySnapshots = await Promise.all(
        queries.map((query) => getDocs(query))
      );

      querySnapshots.forEach((querySnapshot) => {
        setContents((prevContents) => {
          return [
            ...prevContents,
            ...querySnapshot.docs
              .map((doc) => {
                const { title, createDt } = doc.data();

                return {
                  id: doc.id,
                  title,
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
    <>
      <Loader />
      <ConfirmPopup
        isActive={confirmPopupActive}
        confirmMessage={confirmMessage}
        confirmType=""
        onConfirm={handleCancel}
        onCancel={handleCancel}
      />
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <div className={styles.option}>
            <input
              placeholder="Please Enter Your Search Term"
              type="text"
              id="snippet"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
              onKeyUp={(e) => handleSearchDiagrams(e)}
              ref={snippetRef}
            />
            {didSearch && (
              <span>
                {Array.isArray(contents) && contents.length > 0
                  ? 'Found A Total Of ' + contents.length + ' Diagrams.'
                  : 'There Are No Search Results.'}
              </span>
            )}
          </div>
          <div className={styles.contents}>
            {didSearch
              ? Array.isArray(contents) &&
                contents.length > 0 &&
                contents.map((content: any, idx: number) => (
                  <Card
                    key={idx}
                    idx={idx}
                    id={content.id}
                    title={content.title}
                    createDt={content.createDt}
                    path={`/diagrams/${content.type}/${content.id}`}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

interface typeSearchDiagrams extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
  handleSetUid: (uid: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDiagrams);
