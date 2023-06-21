import React from 'react';
import styles from './Diagrams.module.scss';
import Card from 'components/card/Card';
import Loader from 'components/loader';
import { typeContent } from 'modules/types';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import SVG from 'modules/SVG';

const DiagramsPT = ({
  uid,
  uid_,
  type,
  title,
  contents,
  confirmPopupActive,
  confirmMessage,
  onSearch,
  onSignIn,
  // onSignUp,
  onSignOut,
  onDeleteBtn,
  onConfirm,
  onCancel
}: typeDiagramsPT): JSX.Element => {
  return (
    <>
      <Loader />
      <ConfirmPopup
        isActive={confirmPopupActive}
        confirmMessage={confirmMessage}
        confirmType=""
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <div className={styles.wrap}>
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
          <Card id={'0'} idx={-1} title={''} path={`/diagram/${type}/create`} />
          {Array.isArray(contents) &&
            contents.length > 0 &&
            contents.map((content: any, idx: number) => (
              <Card
                key={idx}
                idx={idx}
                id={content.id}
                title={content.title}
                createDt={content.createDt}
                type={type}
                path={`/diagrams/${type}/${content.id}`}
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
  type?: string;
  title: string;
  contents: Array<typeContent>;
  confirmPopupActive: boolean;
  confirmMessage: string;
  onSearch: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
  onDeleteBtn: (e: React.MouseEvent, selectedContentId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default DiagramsPT;
