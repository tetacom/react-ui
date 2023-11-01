import useResizeObserver from '@react-hook/resize-observer';
import React from 'react';

export const useSize = (
  target: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const [size, setSize] = React.useState(new DOMRectReadOnly(0, 0, 0, 0));

  React.useLayoutEffect(() => {
    setSize(target?.current?.getBoundingClientRect() as DOMRectReadOnly);
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
