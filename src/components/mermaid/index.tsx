import { useEffect } from 'react';
import mermaid from 'mermaid';
import styles from './Mermaid.module.scss';

const initConfig = {
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'monospace'
};

const Mermaid = ({ content }: typeMermaid) => {
  const pre = document.querySelector('.mermaid');

  // mermaid 컨텐츠 로드
  useEffect(() => {
    mermaid.initialize(initConfig);
    mermaid.contentLoaded();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { svg } = await mermaid.render('diagram', content);
        if (pre) {
          pre.innerHTML = svg;
        }
      } catch (e) {}
    })();
  }, [content]);

  return <pre className={['mermaid', styles.mermaid].join(' ')}>{content}</pre>;
};

interface typeMermaid {
  content: string;
}

export default Mermaid;
