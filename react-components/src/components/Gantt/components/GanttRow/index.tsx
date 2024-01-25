import React from 'react';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import * as d3 from 'd3';
import { BaseMilestone, MilestoneItem } from '../../model';

import s from './style.module.scss';

dayjs.extend(minMax);

interface GanttRowProps<T, D extends BaseMilestone> {
  item: MilestoneItem<T, D>;
  scale: d3.ScaleTime<number, number>;
}

export function GanttRowComponent<T, D extends BaseMilestone>({
  item,
  scale,
}: GanttRowProps<T, D>) {
  return (
    <div className={s.root}>
      <div className={s.rootItem}>
        {item?.milestones?.map((item) =>
          React.createElement(item.component, {
            scale: scale,
            milestone: item,
            key: item.startTime.toString(),
          }),
        )}
      </div>
    </div>
  );
}
