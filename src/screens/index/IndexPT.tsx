import React from 'react';
import Loader from 'components/loader';
import styles from './Index.module.scss';
import SVG from 'modules/SVG';

const IndexPT = ({
  uid,
  uid_,
  onSearch,
  onSignIn,
  // onSignUp,
  onSignOut,
  onNavigate,
  onTestErrorReport
}: typeIndexPT): JSX.Element => {
  return (
    <>
      <Loader />
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
        <h1>Service Diagrams</h1>
        <div className={styles.buttons}>
          <button onClick={() => onNavigate('sequence')}>
            Sequence Diagrams
          </button>
          <button onClick={() => onNavigate('flow')}>Flow Diagrams</button>
          <button onClick={() => onNavigate('entity-relationship')}>
            Entity-Relationship Diagrams
          </button>
          <button onClick={() => onNavigate('mermaid')}>Mermaid</button>
          <button onClick={() => onTestErrorReport()}>Test Error Report</button>
        </div>
      </div>
    </>
  );
};

interface typeIndexPT {
  uid?: string;
  uid_: string;
  onSearch: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
  onNavigate: (type: string) => void;
  onTestErrorReport: () => void;
}

export default IndexPT;
