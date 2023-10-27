import useResizeObserver from '@react-hook/resize-observer';
import React from 'react';

export const useSize = (
  target: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const [size, setSize] = React.useState<DOMRectReadOnly>();

  console.log(target);

  React.useLayoutEffect(() => {
    setSize(target?.current?.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
