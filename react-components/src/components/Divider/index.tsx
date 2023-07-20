import React, { FC } from 'react';
import { DividerProps } from './model';

import s from './style.module.scss';
import classNames from 'classnames';

export const Divider: FC<DividerProps> = ({
  type = 'vertical',
  length = '100%',
}) => {
  const style = {
    '--divider-length': isNumber(length) ? `${length}px` : length,
  } as React.CSSProperties;

  return (
    <div
      className={classNames(
        s.divider,
        type === 'vertical' ? s.dividerVertical : s.dividerHorizontal,
      )}
      style={style}
    />
  );
};

function isNumber(value: DividerProps['length']): value is number {
  return typeof value === 'number';
}
