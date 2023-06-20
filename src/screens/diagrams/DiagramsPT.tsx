import React from 'react';
import styles from './Diagrams.module.scss';
import Card from 'components/card/Card';
import Loader from 'components/loader';
import { typeContent } from 'modules/types';
import ConfirmPopup from 'components/confirmPopup/ConfirmPopup';

const DiagramsPT = ({
  type,
  title,
  contents,
  confirmPopupActive,
  confirmMessage,
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
  type?: string;
  title: string;
  contents: Array<typeContent>;
  confirmPopupActive: boolean;
  confirmMessage: string;
  onDeleteBtn: (e: React.MouseEvent, selectedContentId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default DiagramsPT;
