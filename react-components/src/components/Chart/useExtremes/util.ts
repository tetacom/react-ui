import { extent } from 'd3';
import { AxisOptions, AxisOrientation, ChartConfig } from '../model';
import { BasePoint } from '../model/base-point';

const extentAccessorMap = new Map<
  AxisOrientation,
  (point: BasePoint) => number
>()
  .set(AxisOrientation.x, (_) => _.x)
  .set(AxisOrientation.y, (_) => _.y);

type AxisPosition = AxisOptions & {
  index: number;
  orientation: AxisOrientation;
};

function createExtremes(config: ChartConfig, options: AxisPosition) {
  let extremes: Array<number> | Array<string> = [];
  const hasMin = options?.min != null;
  const hasMax = options?.max != null;

  if (!hasMin || !hasMax) {
    const linkedSeries = config.series?.filter((serie) => {
      return options?.orientation === AxisOrientation.x
        ? serie['xAxisIndex'] === options.index
        : serie['yAxisIndex'] === options.index;
    });

    const data = linkedSeries?.reduce((acc: BasePoint[], serie) => {
      return acc.concat(serie.data);
    }, []);

    const accessor = extentAccessorMap.get(options.orientation) as (
      point: BasePoint,
    ) => number;

    extremes =
      Array.isArray(data) && data?.length > 0 && data?.length !== undefined
        ? (extent(data, accessor) as number[] | string[])
        : ([0, 1] as number[]);
  }

  if (hasMin) {
    extremes[0] = options.min as number;
  }

  if (hasMax) {
    extremes[1] = options.max as number;
  }

  if (options.inverted) {
    extremes = [...extremes].reverse() as number[] | string[];
  }

  return extremes;
}

export { createExtremes };
export type { AxisPosition };
