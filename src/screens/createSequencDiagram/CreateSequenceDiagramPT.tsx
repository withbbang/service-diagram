import React, { useEffect } from 'react';
import Sequence from 'react-sequence-diagram';
import styles from './CreateSequenceDiagram.module.scss';

const CreateSequenceDiagramPT = (
  props: typeCreateSequenceDiagramPT
): JSX.Element => {
  const ORIGIN = '1.0';
  const REVERSE = '2.0';
  const SELLER = 'Vendedor :department_store:';
  const BUYER = 'Comprador :shopping_trolley:';

  useEffect(() => {}, []);

  return (
    <div className={styles.wrap}>
      <h1>CreateSequenceDiagram Page!</h1>
      <div className={styles.content}>
        <Sequence
          options={{ theme: 'simple' }}
          input={`
            ${ORIGIN}-->${ORIGIN}: 🟢 ${SELLER}
            ${ORIGIN}-->${ORIGIN}: 🟢 HQRRT\\nOCASA 321\\nSeguimiento: EC34874565\\nFecha: 12/11/2021 14:30:55hs
            ${ORIGIN}-->${ORIGIN}: 🟢 Operational_RT\\nCarrier 2FG\\nFecha: 14/11/2021 11:55:33hs
            ${ORIGIN}-->${ORIGIN}: ❌ ${BUYER}
            ${REVERSE}->${REVERSE}: 🔵 P2P_RT\\nCORREO ARGENTINO 422\\nSeguimiento: 16XG34329\\nFecha: 18/11/2021 13:17:23hs
            ${REVERSE}->${ORIGIN}: 🔵 Inicializado
            ${REVERSE}->${REVERSE}: 🔵 ${SELLER}\\nFecha: 24/11/2021 14:30:56hs
            ${REVERSE}->${ORIGIN}: 🔵 Completado  
          `}
        />
      </div>
    </div>
  );
};

interface typeCreateSequenceDiagramPT {}

export default CreateSequenceDiagramPT;
