import * as d3 from 'd3';
import { scaleTime, timeDay, timeMonth } from 'd3';
import dayjs from 'dayjs';
import { MilestoneItem, MilestoneOptions } from '../model/gantt-props';
import { ZoomSize } from '../model/enum/zoom-size.enum';
import { Size } from '../../hooks/useElementSize';

export const useTimeAxis = <T extends MilestoneOptions>(
  items: Array<MilestoneItem<T>>,
  zoomSize: ZoomSize = ZoomSize.month,
  size: Size,
): [number, Date[], d3.ScaleTime<number, number>] => {
  const min = d3.min(items, (item) =>
    d3.min(item.milestones, (_) => _.startTime),
  );
  const max = d3.max(items, (item) =>
    d3.max(item.milestones, (_) => _.endTime),
  );

  const scale = scaleTime([0, size.width]).domain([
    dayjs(min).startOf(zoomSize),
    dayjs(min).endOf(zoomSize),
  ]);

  const ticks = scale
    .copy()
    .domain([dayjs(min).startOf('month'), dayjs(max).endOf('month')])
    .ticks(
      zoomSize === ZoomSize.month
        ? (timeDay.every(1) as unknown as number)
        : (timeMonth.every(1) as unknown as number),
    );

  return [scale(max || new Date()), ticks, scale];
};
