import { maxIndex, scaleLinear } from 'd3';
import type { AxisExtremes } from '../useExtremes/useExtremes';
import { useEffect, useMemo, useState } from 'react';
import { determineWidth, fontOnload } from './util';

type AxisSize = AxisExtremes & { size: number };

function useAxisSize(x: AxisExtremes[], y: AxisExtremes[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fontOnload('Inter').then((loaded) => {
      setLoaded(loaded);
    });
  });

  const xSizes: AxisSize[] = useMemo(() => {
    return x.map((item, index) => {
      const finalSize = 38;
      return {
        ...item,
        size: finalSize,
      };
    });
  }, [loaded, x]);

  const ySizes: AxisSize[] = useMemo(() => {
    return y.map((item, index) => {
      const finalSize = 24;

      const scale = scaleLinear().domain(item.extremes as number[]);

      const measuredTicks = scale.ticks(1000);

      const maxElementLengthIndex = maxIndex(
        measuredTicks,
        (tick) => tick.toString().length,
      );
      const metrics = determineWidth(
        measuredTicks[maxElementLengthIndex].toString(),
      );

      return {
        ...item,
        size: finalSize + metrics.width,
      };
    });
  }, [loaded, y]);

  return { x: xSizes, y: ySizes };
}

export { useAxisSize };
export type { AxisSize };
