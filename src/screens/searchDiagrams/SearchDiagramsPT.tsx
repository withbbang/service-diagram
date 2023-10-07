import React from 'react';
import Loader from 'components/loader';
import ErrorPopup from 'components/errorPopup/ErrorPopup';
import Card from 'components/card/Card';
import SVG from 'modules/SVG';
import styles from './SearchDiagrams.module.scss';

const SearchDiagramsPT = ({
  snippet,
  didSearch,
  contents,
  errorPopupActive,
  errorMessage,
  snippetRef,
  onSetSnippet,
  onSearchDiagrams,
  onBack,
  onErrorPopup
}: typeSearchDiagramsPT): JSX.Element => {
  return (
    <>
      <Loader />
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
        <div className={styles.innerWrap}>
          <div className={styles.option}>
            <input
              placeholder="Please Enter Your Search Term"
              type="text"
              id="snippet"
              value={snippet}
              onChange={(e) => onSetSnippet(e.target.value)}
              onKeyUp={(e) => onSearchDiagrams(e)}
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
                    type={content.type}
                    path={`/diagram/${content.type}/${content.id}`}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

interface typeSearchDiagramsPT {
  snippet: string;
  didSearch: boolean;
  contents: Array<any>;
  errorPopupActive: boolean;
  errorMessage: string;
  snippetRef: React.MutableRefObject<HTMLInputElement>;
  onSetSnippet: React.Dispatch<React.SetStateAction<string>>;
  onSearchDiagrams: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onErrorPopup: () => void;
}

export default SearchDiagramsPT;
