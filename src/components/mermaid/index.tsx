import { useEffect } from 'react';
import mermaid from 'mermaid';
import styles from './Mermaid.module.scss';

const initConfig = {
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'monospace'
}; // mermaid 초기화 구성 변수

const Mermaid = ({ content }: typeMermaid) => {
  const pre = document.querySelector('.mermaid');

  // mermaid 초기화 및 컨텐츠 로드
  useEffect(() => {
    mermaid.initialize(initConfig);
    mermaid.contentLoaded();
  }, []);

  // 실시간 다이어그램 수정을 위한 useEffect
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
