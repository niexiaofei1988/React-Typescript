import { useState, useRef, useEffect } from 'react';
import { isClient } from './utils';

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const frame = useRef(0);
  const [state, setState] = useState<{ width: number; height: number }>({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
  });

  useEffect(() => {
    if (isClient) {
      const handler = () => {
        // 取消动画
        cancelAnimationFrame(frame.current);

        frame.current = window.requestAnimationFrame(() => {
          setState({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        });
      };

      window.addEventListener('resize', handler);

      return () => {
        cancelAnimationFrame(frame.current);
        window.removeEventListener('resize', handler);
      };
    } else {
      // todo 此处为什么返回的是 undefined 而不是 { width: 0, height: 0 }
      return undefined;
    }
  }, []);

  return state;
};

export default useWindowSize;
