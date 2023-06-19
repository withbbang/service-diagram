import React from 'react';
import styles from './Diagrams.module.scss';
import Card from 'components/card/Card';
import Loader from 'components/loader';
import { typeContent } from 'modules/types';

const DiagramsPT = ({ type, title, contents }: typeDiagramsPT): JSX.Element => {
  return (
    <>
      <Loader />
      <div className={styles.wrap}>
        <h2>{title}</h2>
        <div className={styles.innerWrap}>
          <Card id={0} idx={-1} title={''} path={`/diagram/${type}/create`} />
          {Array.isArray(contents) &&
            contents.length > 0 &&
            contents.map((content: any, idx: number) => (
              <Card
                key={idx}
                idx={idx}
                id={content.id}
                title={content.title}
                path={`/diagrams/${type}/${content.id}`}
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
}

export default DiagramsPT;
