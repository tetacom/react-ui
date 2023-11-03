import React, { FC } from 'react';
import classNames from 'classnames';

import { IconProps } from './model';
import s from './style.module.scss';

export const Icon: FC<IconProps> = ({
  name,
  color = 'inherit',
  size = 16,
  ...props
}) => {
  const { className, style } = props;

  return (
    <svg
      width={size}
      height={size}
      className={classNames(s.icon, className)}
      style={{ color, ...style }}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};
