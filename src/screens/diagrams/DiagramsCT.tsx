import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
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
        if (type === 'sequence') {
          setTitle('Sequence Diagrams');
          const querySnapshot = await getDocs(collection(db, type));
          setContents(
            querySnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                title: doc.data().title
              };
            })
          );
        } else if (type === 'flow') {
          setTitle('Flow Diagrams');
          //TODO: flow diagram 불러오기
        } else if (type === 'entity-relationship') {
          setTitle('Entity-Relationship Diagrams');
          //TODO: erd diagram 불러오기
        }
      }
      handleLoaderFalse();
    })();
  }, []);

  return <DiagramsPT type={type} title={title} contents={contents} />;
};

interface typeDiagramsCT {
  handleLoaderTrue: () => void;
  handleLoaderFalse: () => void;
}

export default DiagramsCT;
