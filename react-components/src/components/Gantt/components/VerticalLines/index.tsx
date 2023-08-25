import React, { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import * as d3 from 'd3';

import s from './style.module.scss';

interface Props {
  scale: d3.ScaleTime<number, number>;
  ticks: Date[];
}

export const VerticalLines: FC<Props> = ({ scale, ticks }) => {
  const monthTicks = useMemo(
    () =>
      ticks.filter((_) => {
        return dayjs(_).date() === 1;
      }),
    [ticks],
  );

  return (
    <div className={s.root}>
      {monthTicks.map((tick, index, ticks) => {
        return (
          <div
            key={tick.getTime()}
            className={s.rootLine}
            style={{
              left: scale(ticks[index]),
            }}
          />
        );
      })}
    </div>
  );
};
