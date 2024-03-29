import { MutableRefObject, useLayoutEffect, useRef, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

type Size = Pick<DOMRect, 'width' | 'height'>;

export const useElementSize = <T extends HTMLElement>(): [
  MutableRefObject<T | null>,
  Size,
] => {
  const target = useRef<T | null>(null);
  const [size, setSize] = useState<Size>(new DOMRect(0, 0));

  useLayoutEffect(() => {
    if (target.current) {
      const rect = target.current.getBoundingClientRect();
      setSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [target]);

  useResizeObserver(target, (entry) => {
    const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
    setSize({ width, height });
  });

  return [target, size];
};
