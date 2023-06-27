import React, { FC } from 'react';

import { SkeletonProps } from './model';

import s from './style.module.scss';

export const Skeleton: FC<SkeletonProps> = ({ rows = 1, columns = 100 }) => {
  const rowsList: string[] = [];
  for (let i = 1; i <= rows; i++) {
    rowsList.push(String(i));
  }

  const RowElement = () => {
    if (Array.isArray(columns)) {
      return (
        <div className={s.row}>
          {columns.map((column, index) => (
            <div key={index}>
              <div
                className={s.skeleton}
                // style={{ width: `${column}%` }}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={s.row}>
        <div className={s.skeleton} style={{ width: `${columns}%` }} />
      </div>
    );
  };

  return (
    <div className={s.root}>
      {rowsList.map((row) => (
        <RowElement key={row} />
        // <div key={row} className={s.skeleton} />
      ))}
    </div>
  );
};
