import React from 'react';
import EntityRelationship from 'components/entityRelationship';
import Loader from 'components/loader';
import styles from './CreateEntityRelationshipDiagram.module.scss';

const CreateErdDiagramPT = ({}: typeCreateErdDiagramPT): JSX.Element => {
  return (
    <>
      <Loader />
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <div className={styles.content}>
            <EntityRelationship />
          </div>
        </div>
      </div>
    </>
  );
};

interface typeCreateErdDiagramPT {}

export default CreateErdDiagramPT;
