import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore';
import DiagramsPT from './DiagramsPT';
import { app } from 'modules/utils';
import { typeContent } from 'modules/types';

const DiagramsCT = ({
  handleLoaderTrue,
  handleLoaderFalse
}: typeDiagramsCT): JSX.Element => {
  const db = getFirestore(app);
  const { type } = useParams();
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<Array<typeContent>>([]);

  useEffect(() => {
    (async () => {
      handleLoaderTrue();
      if (type !== undefined) {
        const q = query(collection(db, type), where('isDone', '==', 'Y'));
        const querySnapshot = await getDocs(q);
        setContents(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              title: doc.data().title
            };
          })
        );
        handleLoaderFalse();

        if (type === 'sequence') {
          setTitle('Sequence Diagrams');
        } else if (type === 'flow') {
          setTitle('Flow Diagrams');
        } else if (type === 'entity-relationship') {
          setTitle('Entity-Relationship Diagrams');
        }
      }
    })();
  }, []);

  return <DiagramsPT type={type} title={title} contents={contents} />;
};

interface typeDiagramsCT {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default DiagramsCT;
