import React, { forwardRef, useMemo } from 'react';
import dayjs from 'dayjs';

import { Typography } from '../../../Typography';

import s from './style.module.scss';

interface Props {
  size: any;
  maxWidth: any;
  scale: any;
  ticks: any[];
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
        className="dates"
        style={{
          position: 'relative',
          width: maxWidth,
          display: 'flex',
          flexDirection: 'column',
          border: '3px dashed red',
        }}
      >
        <div
          className="years"
          style={{
            height: 16,
            display: 'flex',
            border: '3px dashed green',
          }}
        >
          {years.map((yearTick, index, yearTicks) => {
            const width = yearTicks[index + 1]
              ? Math.abs(scale(yearTicks[index + 1]) - scale(yearTick))
              : 'max-content';

            return (
              <div
                key={yearTick.getTime()}
                className="yearsItem"
                style={{
                  width,
                  flexGrow: yearTicks.length - 1 !== index ? 0 : 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography.Text
                  className="yearsItemText"
                  fontVariant="overline"
                  style={{
                    position: 'sticky',
                    left: 0,
                    color: 'var(--color-text-50)',
                  }}
                >
                  {dayjs(yearTick).year()}
                </Typography.Text>
              </div>
            );
          })}
        </div>

        <div
          className="yearsItem"
          style={{
            height: 16,
            display: 'flex',
            border: '3px dashed orange',
          }}
        >
          {ticks
            .filter((_) => {
              return dayjs(_).date() === 1;
            })
            .map((tick, index, ticks) => {
              return (
                <div
                  key={tick.getTime()}
                  style={{
                    width: ticks[index + 1]
                      ? Math.abs(scale(ticks[index + 1]) - scale(tick))
                      : 'max-content',
                    flexGrow: ticks.length - 1 !== index ? 0 : 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography.Text
                    fontVariant="overline"
                    style={{
                      position: 'sticky',
                      left: 0,
                      color: 'var(--color-text-50)',
                    }}
                  >
                    {dayjs(tick).format('MMMM')}
                  </Typography.Text>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
});
