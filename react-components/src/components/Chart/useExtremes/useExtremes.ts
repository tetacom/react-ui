import { useMemo } from 'react';
import { AxisOrientation, ChartConfig } from '../model';
import { AxisPosition, createExtremes } from './util';

type AxisExtremes = AxisPosition & { extremes: number[] | string[] };

function useExtremes(config: ChartConfig) {
  const y: AxisExtremes[] = useMemo(() => {
    return config.yAxis.map((item, index) => {
      const position = {
        index,
        orientation: AxisOrientation.y,
      };

      const extremes = createExtremes(config, {
        ...item,
        ...position,
      });

      return {
        ...item,
        ...position,
        extremes,
      };
    });
  }, [config]);

  const x: AxisExtremes[] = useMemo(() => {
    return config.xAxis.map((item, index) => {
      const position = {
        index,
        orientation: AxisOrientation.x,
      };

      const extremes = createExtremes(config, {
        ...item,
        ...position,
      });

      return {
        ...item,
        ...position,
        extremes,
      };
    });
  }, [config]);

  return { x, y };
}

export { useExtremes };
export type { AxisExtremes };
