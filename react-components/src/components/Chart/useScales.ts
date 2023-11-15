import { scaleLinear, ScaleLinear, ScaleTime } from 'd3';
import { AxisSize } from './useAxisSize/useAxisSize';
import { useMemo } from 'react';

export type Scales = {
  x: Array<Axis>;
  y: Array<Axis>;
  finalLeftPadding: number;
  finalBottomPadding: number;
};

type Axis = AxisSize & {
  scale:
    | ScaleLinear<number, number, unknown>
    | ScaleTime<number, number, unknown>;
  padding: number;
};

function useScales(
  x: AxisSize[],
  y: AxisSize[],
  size: DOMRectReadOnly,
  transform: d3.ZoomTransform,
): Scales {
  const finalBottomPadding = x.reduce((acc, item) => item.size + acc, 0);
  const finalLeftPadding = y.reduce((acc, item) => item.size + acc, 0);

  let leftPadding = finalLeftPadding;
  let bottomPadding = finalBottomPadding;

  const yScales = useMemo(() => {
    return y.map((item) => {
      const scale = scaleLinear()
        .domain(item.extremes as number[])
        .range([0.5, size.height - finalBottomPadding]);

      if (item.niceTicks) {
        scale.nice();
      }

      const axis: Axis = {
        ...item,
        scale: transform.rescaleY(scale),
        padding: leftPadding,
      };

      leftPadding -= item.size;

      return axis;
    });
  }, [transform, size]);

  const xScales = useMemo(() => {
    return x.map((item) => {
      const scale = scaleLinear()
        .domain(item.extremes as number[])
        // TODO Начнинаем рисовать с 0.5px (возможен баг в синхранизации графиков в последующем, обязательно проверить)
        .range([0.5, size.width - finalLeftPadding]);

      if (item.niceTicks) {
        scale.nice();
      }

      const axis: Axis = {
        ...item,
        scale: transform.rescaleX(scale),
        padding: bottomPadding,
      };

      bottomPadding -= item.size;

      return axis;
    });
  }, [transform, size]);

  return { y: yScales, x: xScales, finalLeftPadding, finalBottomPadding };
}

export { useScales };
export type { Axis };
