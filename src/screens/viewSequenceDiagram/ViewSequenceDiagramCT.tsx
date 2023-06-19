import React, { useEffect, useState } from 'react';
import ViewSequenceDiagramPT from './ViewSequenceDiagramPT';
import styles from 'components/functionPopup/FunctionPopup.module.scss';

const ViewSequenceDiagramCT = (
  props: typeViewSequenceDiagramCT
): JSX.Element => {
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

  return <ViewSequenceDiagramPT title={title} content={content} />;
};

interface typeViewSequenceDiagramCT {}

export default ViewSequenceDiagramCT;
