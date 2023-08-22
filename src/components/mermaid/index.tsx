import { useEffect } from 'react';
import mermaid from 'mermaid';
import styles from './Mermaid.module.scss';

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'monospace'
});

const Mermaid = ({ content }: typeMermaid) => {
  // mermaid 컨텐츠 로드
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return <div className={['mermaid', styles.mermaid].join(' ')}>{content}</div>;
};

interface typeMermaid {
  content: string;
}

export default Mermaid;
