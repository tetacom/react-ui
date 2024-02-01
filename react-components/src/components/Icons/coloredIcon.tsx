import React, { FC } from 'react';
import classNames from 'classnames';

import { BaseProps } from './model';

import s from './style.module.scss';

export const ColoredIcon: FC<BaseProps> = ({
  name,
  size = 16,
  onClick,
  ...props
}) => {
  const { className, style } = props;

  return (
    <div className={s.icon}>
      <svg
        {...props}
        width={size}
        height={size}
        onClick={onClick}
        className={classNames(s.icon, className)}
        style={{ ...style }}
      >
        <use xlinkHref={`#${name}`} />
      </svg>
    </div>
  );
};
