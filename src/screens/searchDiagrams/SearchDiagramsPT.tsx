import React from 'react';
import Loader from 'components/loader';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';
import Card from 'components/card/Card';
import styles from './SearchDiagrams.module.scss';

const SearchDiagramsPT = ({
  snippet,
  didSearch,
  contents,
  confirmPopupActive,
  confirmMessage,
  snippetRef,
  onSetSnippet,
  onSearchDiagrams,
  onCancel
}: typeSearchDiagramsPT): JSX.Element => {
  return (
    <>
      <Loader />
      <ConfirmPopup
        isActive={confirmPopupActive}
        confirmMessage={confirmMessage}
        confirmType=""
        onConfirm={onCancel}
        onCancel={onCancel}
      />
      <div className={styles.wrap}>
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

interface typeSearchDiagramsPT {
  snippet: string;
  didSearch: boolean;
  contents: Array<any>;
  confirmPopupActive: boolean;
  confirmMessage: string;
  snippetRef: React.MutableRefObject<HTMLInputElement>;
  onSetSnippet: React.Dispatch<React.SetStateAction<string>>;
  onSearchDiagrams: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}

export default SearchDiagramsPT;
