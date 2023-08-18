import React, { forwardRef, useMemo } from 'react';
import dayjs from 'dayjs';
import * as d3 from 'd3';

import { Size } from '../../model/size';
import { TextContent } from './TextContent';

import s from './style.module.scss';

interface Props {
  size: Size;
  maxWidth: number;
  scale: d3.ScaleTime<number, number>;
  ticks: Date[];
}

export const GanttDatesTrack = forwardRef<HTMLDivElement, Props>(function (
  { size, maxWidth, scale, ticks },
  ref,
) {
  const years = useMemo(() => {
    const yearsMap: Map<number, Date> = new Map();
    ticks.forEach((date) => {
      const year = dayjs(date).year();
      if (!yearsMap.get(year)) {
        yearsMap.set(year, date);
      }
    });

    return Array.from(yearsMap).map(([, date]) => date);
  }, [ticks]);

  return (
    <div
      ref={ref}
      className={s.root}
      style={{
        width: size.width,
      }}
    >
      <div
        className={s.dates}
        style={{
          width: maxWidth,
        }}
      >
        <div className={s.scale}>
          {years.map((yearTick, index, yearTicks) => {
            const width = yearTicks[index + 1]
              ? Math.abs(scale(yearTicks[index + 1]) - scale(yearTick))
              : 'max-content';

            return (
              <div
                key={yearTick.getTime()}
                className={s.scaleItem}
                style={{
                  width,
                  flexGrow: yearTicks.length - 1 !== index ? 0 : 1,
                }}
              >
                <TextContent>{dayjs(yearTick).year()}</TextContent>
              </div>
            );
          })}
        </div>

        <div className={s.scale}>
          {ticks
            .filter((_) => {
              return dayjs(_).date() === 1;
            })
            .map((tick, index, ticks) => {
              return (
                <div
                  key={tick.getTime()}
                  className={s.scaleItem}
                  style={{
                    width: ticks[index + 1]
                      ? Math.abs(scale(ticks[index + 1]) - scale(tick))
                      : 'max-content',
                    flexGrow: ticks.length - 1 !== index ? 0 : 1,
                  }}
                >
                  <TextContent>{dayjs(tick).format('MMMM')}</TextContent>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
});
