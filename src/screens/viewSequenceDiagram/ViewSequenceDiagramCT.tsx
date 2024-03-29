import React, { useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { app, handleHasPermission } from 'modules/utils';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import ViewSequenceDiagramPT from './ViewSequenceDiagramPT';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';

const ViewSequenceDiagramCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeViewSequenceDiagramCT): JSX.Element => {
  const db = getFirestore(app);
  const type = 'sequence';
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>(``);
  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅

  // 초기 다이어그램 불러오기
  useEffect(() => {
    (async () => {
      try {
        if (id !== undefined) {
          handleLoaderTrue();

          let docSnap;
          try {
            docSnap = await getDoc(doc(db, type, id));
          } catch (error) {
            console.error(error);
            throw Error('Data Fetching Error');
          }

          if (docSnap !== undefined && docSnap.exists()) {
            const { title, content, isDone, company } = docSnap.data();

            if (
              isDone !== 'Y' &&
              (uid === undefined ||
                uid === null ||
                uid === '' ||
                !handleHasPermission('r', await handleGetGrade(company)))
            ) {
              throw Error('Invalid Detail ID');
            }

            setTitle(title);
            setContent(content);
          } else {
            throw Error('Invalid Detail ID');
          }
        } else {
          throw Error('No Document Detail ID');
        }
      } catch (error: any) {
        console.error(error);
        setErrorMessage(error.message);
        setErrorPopupActive(true);
      } finally {
        handleLoaderFalse();
      }
    })();
  }, []);

  // 로그인 되어있을 경우 grade 반환 함수
  const handleGetGrade = async (corp?: string) => {
    if (uid !== undefined && uid !== null && uid !== '') {
      const docSnap = await getDoc(doc(db, 'authority', uid));

      if (docSnap !== undefined && docSnap.exists()) {
        const { grade, company } = docSnap.data();

        if (company === 'ALL' || company === corp) return grade;
      }
    }
  };

  // error 팝업 확인 버튼
  const handleErrorPopup = () => {
    setErrorMessage('');
    setErrorPopupActive(false);
    navigate(-1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ViewSequenceDiagramPT
      title={title}
      content={content}
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
      onErrorPopup={handleErrorPopup}
      onBack={handleBack}
    />
  );
};

interface typeViewSequenceDiagramCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default ViewSequenceDiagramCT;
