import React, { useEffect } from 'react';
import styles from './Diagrams.module.scss';
import Card from 'components/card/Card';

const DiagramsPT = ({ type, title }: typeDiagramsPT): JSX.Element => {
  return (
    <>
      <div className={styles.wrap}>
        <h2>{title}</h2>
        <div className={styles.innerWrap}>
          <Card id={0} idx={-1} title={''} path={`/diagram/${type}/create`} />
          {/* TODO: 다이어그램들 뿌려주기 */}
          {/* {Array.isArray(diagrams) &&
          diagrams.length > 0 &&
          diagrams.map((diagram: any, idx: number) => (
            <Card
              key={idx}
              idx={idx}
              id={diagram.ID}
              title={diagram.TITLE}
              path={diagram.PATH}
            />
          ))} */}
        </div>
      </div>
    </>
  );
};

interface typeDiagramsPT {
  type?: string;
  title: string;
}

export default DiagramsPT;
