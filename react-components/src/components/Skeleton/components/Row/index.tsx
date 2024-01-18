import React, { FC } from 'react';

import { defaultValues, SkeletonProps } from '../../model';

import s from './style.module.scss';

interface Props
  extends Pick<SkeletonProps, 'columns' | 'columnsUnit' | 'height' | 'gap'> {
  withRandomDiff?: boolean;
}

export const Row: FC<Props> = ({
  columns = defaultValues.columns,
  columnsUnit = defaultValues.columnsUnit,
  height = defaultValues.height,
  gap = defaultValues.gap,
  withRandomDiff = true,
}) => {
  const randomValue = withRandomDiff ? Math.random() : 0;

  if (Array.isArray(columns)) {
    return (
      <div
        className={s.row}
        style={{
          gap,
          gridTemplateColumns: `${columns.join(
            `${columnsUnit} `,
          )}${columnsUnit}`,
        }}
      >
        {columns.map((column, index) => {
          const randomLength = 100 - Math.round(randomValue * 50);

          return (
            <div
              key={index}
              className={s.skeleton}
              style={{ width: `${randomLength}%`, height: height }}
            />
          );
        })}
      </div>
    );
  }

  const singleWidth = `calc(${columns}${columnsUnit} - ${Math.round(
    randomValue * (columns / 2),
  )}${columnsUnit})`;

  return (
    <div className={s.row} style={{ gap }}>
      <div
        className={s.skeleton}
        style={{ width: singleWidth, height: height }}
      />
    </div>
  );
};
