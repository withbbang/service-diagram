import React from 'react';
import styles from './Diagrams.module.scss';
import DiagramCard from 'components/diagramCard/DiagramCard';
import { typeContent } from 'modules/types';
import SVG from 'modules/SVG';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import ErrorPopup from 'components/errorPopup/ErrorPopup';

const DiagramsPT = ({
  uid,
  uid_,
  grade,
  type,
  title,
  contents,
  confirmPopupActive,
  confirmMessage,
  errorPopupActive,
  errorMessage,
  onSearch,
  onSignIn,
  onSignUp,
  onSignOut,
  onBack,
  onDeleteBtn,
  onConfirm,
  onCancel,
  onErrorPopup
}: typeDiagramsPT): JSX.Element => {
  return (
    <>
      <ConfirmPopup
        isActive={confirmPopupActive}
        confirmMessage={confirmMessage}
        confirmType=""
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <ErrorPopup
        isActive={errorPopupActive}
        errorMessage={errorMessage}
        onConfirm={onErrorPopup}
      />
      <div className={styles.wrap}>
        <div className={styles.backBtn}>
          <span onClick={onBack}>
            <SVG type="back" width="30px" height="30px" />
          </span>
        </div>
        <div className={styles.signBtns}>
          <span onClick={onSearch}>
            <SVG type="search" width="30px" height="30px" />
          </span>
          {uid !== undefined &&
          uid !== null &&
          uid !== '' &&
          uid_ !== '' &&
          uid === uid_ ? (
            <button onClick={onSignOut}>Sign Out</button>
          ) : (
            <>
              <button onClick={onSignIn}>Sign In</button>
              {/* <button onClick={onSignUp}>Sign Up</button> */}
            </>
          )}
        </div>
        <h2>{title}</h2>
        <div className={styles.innerWrap}>
          <DiagramCard
            id={'0'}
            idx={-1}
            title={''}
            path={`/diagram/${type}/create`}
            grade={grade}
          />
          {Array.isArray(contents) &&
            contents.length > 0 &&
            contents.map((content: any, idx: number) => (
              <DiagramCard
                key={idx}
                idx={idx}
                id={content.id}
                title={content.title}
                createdBy={content.createdBy}
                createDt={content.createDt}
                type={type}
                path={`/diagram/${type}/${content.id}`}
                grade={grade}
                onDeleteBtn={onDeleteBtn}
              />
            ))}
        </div>
      </div>
    </>
  );
};

interface typeDiagramsPT {
  uid?: string;
  uid_: string;
  grade?: number;
  type?: string;
  title: string;
  contents: Array<typeContent>;
  confirmPopupActive: boolean;
  confirmMessage: string;
  errorPopupActive: boolean;
  errorMessage: string;
  onSearch: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
  onBack: () => void;
  onDeleteBtn: (e: React.MouseEvent, selectedContentId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onErrorPopup: () => void;
}

export default DiagramsPT;
