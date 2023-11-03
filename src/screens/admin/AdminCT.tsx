import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPT from './AdminPT';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { onAuthStateChanged } from 'firebase/auth';
import {
  app,
  auth,
  handleConvertTimestamp,
  handleHasPermission
} from 'modules/utils';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { typeAuthority } from 'modules/types';

const AdminCT = ({
  uid,
  handleLoaderTrue,
  handleLoaderFalse
}: typeAdminCT): JSX.Element => {
  const db = getFirestore(app); // Firebase 객체
  const type = 'authority'; // 조회 타입
  const navigate = useNavigate(); // router 제어 훅
  const [uid_, setUid_] = useState<string>(''); // 로그인 여부 판단 훅
  const [grade, setGrade] = useState<number>(20); // 유저 등급
  const [users, setUsers] = useState<Array<typeAuthority>>([]); // 가입된 유저들
  const [newGrade, setNewGrade] = useState<number>(20); // 유저 관리 팝업에서 변경할 등급

  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(); // 선택된 유저 ID
  const [confirmPopupActive, setConfirmPopupActive] = useState<boolean>(false); // 확인 팝업 활성 상태
  const [confirmMessage, setConfirmMessage] = useState<string>(''); // 확인 팝업 내용 설정 훅
  const [errorPopupActive, setErrorPopupActive] = useState<boolean>(false); // 에러 팝업 활성 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 팝업 내용 설정 훅
  const [userManagePopupActive, setUserManagePopupActive] =
    useState<boolean>(false); // 유저 관리 팝업 활성 상태

  const [xPos, setXPos] = useState<number | undefined>(); // 유저 카드 클릭 위치값
  const [yPos, setYPos] = useState<number | undefined>(); // 유저 카드 클릭 위치값

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
          const { uid } = user;

          const docSnap = await getDoc(doc(db, type, uid));

          if (docSnap !== undefined && docSnap.exists()) {
            const { grade } = docSnap.data();

            if (!handleHasPermission('m', grade)) {
              throw Error("You Don't Have Permission");
            } else {
              await handleGetUsers();
              setGrade(grade);
              setUid_(uid);
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

  // 가입된 유저 정보들 가져오기
  const handleGetUsers = async () => {
    try {
      const q = query(collection(db, type), orderBy('createDt', 'desc'));
      const querySnapshot = await getDocs(q);

      setUsers(
        querySnapshot.docs.map((doc) => {
          const data = doc.data() as typeAuthority;

          return {
            ...data,
            id: doc.id,
            createDt: handleConvertTimestamp(data.createDt.toDate(), 'date'),
            deleteDt: data.deleteDt
              ? handleConvertTimestamp(data.deleteDt.toDate(), 'date')
              : '',
            updateDt: data.updateDt
              ? handleConvertTimestamp(data.updateDt.toDate(), 'date')
              : ''
          };
        })
      );
    } catch (error: any) {
      console.error(error.message);
      throw Error('Data Fetching Error');
    }
  };

  // 유저 카드 클릭 이벤트
  const handleClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id?: string
  ) => {
    setXPos(e.clientX);
    setYPos(e.clientY);
    setSelectedUserId(id);
    setUserManagePopupActive(!userManagePopupActive);
  };

  // update 팝업 확인 버튼
  const handleUpdateBtn = () => {
    setConfirmMessage('Really Update?');
    setConfirmPopupActive(true);
  };

  // confirm 팝업 확인 버튼
  const handleConfirm = async () => {
    if (selectedUserId !== undefined) {
      setConfirmMessage('');
      setConfirmPopupActive(false);
      handleLoaderTrue();
      try {
        if (
          users.filter((user) => user.id === selectedUserId)[0].grade ===
          newGrade
        )
          throw Error('No Same Grade');

        await updateDoc(doc(db, type, selectedUserId), {
          grade: newGrade,
          updateDt: serverTimestamp()
        });

        handleGetUsers();
      } catch (error) {
        console.error(error);
        setErrorMessage('Data Updating Error');
        setErrorPopupActive(true);
      } finally {
        setUserManagePopupActive(!userManagePopupActive);
        setSelectedUserId(undefined);
        handleLoaderFalse();
      }
    } else {
      setErrorMessage('No User ID!');
      setErrorPopupActive(true);
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
    <AdminPT
      xPos={xPos}
      yPos={yPos}
      uid={uid}
      uid_={uid_}
      grade={grade}
      newGrade={newGrade}
      selectedUserId={selectedUserId}
      users={users}
      confirmPopupActive={confirmPopupActive}
      confirmMessage={confirmMessage}
      errorPopupActive={errorPopupActive}
      errorMessage={errorMessage}
      userManagePopupActive={userManagePopupActive}
      onBack={handleBack}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onErrorPopup={handleErrorPopup}
      onClickCard={handleClickCard}
      onSetNewGrade={setNewGrade}
      onUpdateBtn={handleUpdateBtn}
    />
  );
};

interface typeAdminCT extends CommonState {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default AdminCT;
