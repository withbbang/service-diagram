import React, { useEffect, useState } from 'react';
import CreateSequenceDiagramPT from './CreateSequenceDiagramPT';
import styles from 'components/functionPopup/FunctionPopup.module.scss';

const CreateSequenceDiagramCT = (
  props: typeCreateSequenceDiagramCT
): JSX.Element => {
  const titleRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const contentRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const createUpdateBtnRef =
    React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const [isFunctionPopupActive, setIsFunctionPopupActive] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string>('Test Sequence Diagram');
  const [content, setContent] = useState<string>(`
    1.0-->1.0: 🟢 Vendedor :department_store:
    1.0-->1.0: 🟢 HQRRT\\nOCASA 321\\nSeguimiento: EC34874565\\nFecha: 12/11/2021 14:30:55hs
    1.0-->1.0: 🟢 Operational_RT\\nCarrier 2FG\\nFecha: 14/11/2021 11:55:33hs
    1.0-->1.0: ❌ Comprador :shopping_trolley:
    2.0->2.0: 🔵 P2P_RT\\nCORREO ARGENTINO 422\\nSeguimiento: 16XG34329\\nFecha: 18/11/2021 13:17:23hs
    2.0->1.0: 🔵 Inicializado
    2.0->2.0: 🔵 Vendedor :department_store:\\nFecha: 24/11/2021 14:30:56hs
    2.0->1.0: 🔵 Completado
  `);

  useEffect(() => {}, []);

  const handleCreateUpdatePopup = () => {
    setIsFunctionPopupActive(!isFunctionPopupActive);
  };

  const handleTextAreaTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      const el = document.getElementById('content') as HTMLTextAreaElement;

      el.setRangeText('  ', el.selectionStart, el.selectionStart, 'end');
    }
  };

  const handleChildren = (
    <div className={styles.contentBox}>
      <div className={styles.option}>
        <input
          placeholder="TITLE"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // onKeyUp={(e) => handleCreateUpdateContent(e)}
          onKeyUp={(e) => {}}
          ref={titleRef}
        />
        {/* <select
          defaultValue={isDone}
          onChange={(e) => setIsDone(e.target.value)}
        >
          <option value={'N'}>비노출</option>
          <option value={'Y'}>노출</option>
        </select> */}
      </div>
      <textarea
        placeholder="CONTENT"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => handleTextAreaTab(e)}
        ref={contentRef}
      />
      <button
        // onClick={() => handleCreateUpdateContent()}
        onKeyUp={(e) => {}}
        ref={createUpdateBtnRef}
      >
        확인
      </button>
    </div>
  );

  return (
    <CreateSequenceDiagramPT
      title={title}
      content={content}
      isFunctionPopupActive={isFunctionPopupActive}
      children={handleChildren}
      onCreateUpdatePopup={handleCreateUpdatePopup}
    />
  );
};

interface typeCreateSequenceDiagramCT {}

export default CreateSequenceDiagramCT;
