import React, { useEffect } from 'react';
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig,
  diagramOn
} from 'react-flow-diagram';
import model from './model';
import { config, customEntities } from './config';

const FlowDiagram = (): JSX.Element => {
  useEffect(() => {
    diagramStore.dispatch(setConfig(config));
    diagramStore.dispatch(setEntities(model));

    diagramOn('anyChange', (entityState: any) => {
      // You can get the model back
      // after modifying the UI representation
      console.info(entityState);
    });
  }, []);

  return <Diagram customEntities={customEntities} />;
};

export default FlowDiagram;
