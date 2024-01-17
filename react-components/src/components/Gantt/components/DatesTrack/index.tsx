import React, { forwardRef, useMemo } from 'react';
import dayjs from 'dayjs';
import * as d3 from 'd3';

import { TextContent } from './TextContent';

import s from './style.module.scss';

interface Props {
  size: Pick<DOMRect, 'width' | 'height'>;
  maxWidth: number;
  scale: d3.ScaleTime<number, number>;
  ticks: Date[];
  handleScrollDateTrack: (scroll: React.BaseSyntheticEvent) => void;
}

export const GanttDatesTrack = forwardRef<HTMLDivElement, Props>(function (
  { size, maxWidth, scale, ticks, handleScrollDateTrack },
  ref,
) {
  const [years, yearGridColumns] = useMemo(() => {
    const yearsMap: Map<number, Date> = new Map();
    ticks.forEach((date) => {
      const year = dayjs(date).year();
      if (!yearsMap.get(year)) {
        yearsMap.set(year, date);
      }
    });
    const years = Array.from(yearsMap).map(([, date]) => date);

    const yearGridColumns = years.reduce((acc, _, index, yearArray) => {
      const width = yearArray[index + 1]
        ? (scale(yearArray[index + 1]) - scale(yearArray[index])).toFixed(3) +
          'px'
        : '1fr';

      return `${acc}${width} `;
    }, '');

    return [years, yearGridColumns];
  }, [ticks]);

  const [months, monthGridColumns] = useMemo(() => {
    const months = ticks.filter((_) => {
      return dayjs(_).date() === 1;
    });
    const monthGridColumns = months.reduce((acc, _, index, monthArray) => {
      const width = monthArray[index + 1]
        ? (scale(monthArray[index + 1]) - scale(monthArray[index])).toFixed(3) +
          'px'
        : '1fr';

      return `${acc}${width} `;
    }, '');

    return [months, monthGridColumns];
  }, [ticks]);

  return (
    <div
      ref={ref}
      className={s.root}
      onScroll={handleScrollDateTrack}
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
        <div
          className={s.scale}
          style={{
            gridTemplateColumns: yearGridColumns,
          }}
        >
          {years.map((yearTick, index, yearTicks) => {
            const hasNextElement = yearTicks[index + 1];
            const width = hasNextElement ? '100%' : 'max-content';

            return (
              <div
                key={yearTick.getTime()}
                className={s.scaleItem}
                style={{
                  width,
                  flexGrow: hasNextElement ? 1 : 0,
                }}
              >
                <TextContent>{dayjs(yearTick).year()}</TextContent>
              </div>
            );
          })}
        </div>

        <div
          className={s.scale}
          style={{
            gridTemplateColumns: monthGridColumns,
          }}
        >
          {months.map((month, index, monthsArray) => {
            const hasNextElement = monthsArray[index + 1];
            const width = hasNextElement ? '100%' : 'max-content';

            return (
              <div
                key={month.getTime()}
                className={s.scaleItem}
                style={{
                  width: width,
                  flexGrow: hasNextElement ? 1 : 0,
                }}
              >
                <TextContent>
                  {dayjs(month).locale('ru').format('MMMM')}
                </TextContent>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
