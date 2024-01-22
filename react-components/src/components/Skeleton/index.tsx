import React, { FC } from 'react';

import { defaultValues, SkeletonProps } from './model';
import { Row } from './components/Row';

import s from './style.module.scss';

export const Skeleton: FC<SkeletonProps> = ({
  rows = defaultValues.rows,
  columns = defaultValues.columns,
  columnsUnit = defaultValues.columnsUnit,
  isTable = defaultValues.isTable,
  height = defaultValues.height,
  gap = defaultValues.gap,
}) => {
  const rowsList: string[] = [];
  for (let i = 1; i <= rows; i++) {
    rowsList.push(String(i));
  }

  return (
    <div className={s.skeleton}>
      {isTable && (
        <>
          <div className={s.rows} style={{ gap }}>
            <Row
              columns={columns}
              columnsUnit={columnsUnit}
              height={height}
              gap={gap}
            />
          </div>

          <div className={s.divider} />
        </>
      )}

      <div className={s.rows} style={{ gap }}>
        {rowsList.map((row) => (
          <Row
            key={row}
            columns={columns}
            columnsUnit={columnsUnit}
            height={height}
            gap={gap}
            withRandomDiff={rowsList.length !== 1}
          />
        ))}
      </div>
    </div>
  );
};
