import React, { FC } from 'react';
import classNames from 'classnames';

import IconsSVG from '../../assets/icons.svg';
import s from './style.module.scss';
import { BaseProps } from './types';

export interface IconProps extends BaseProps {
  color?: string;
}

export const Icon: FC<IconProps> = ({
  name,
  color = 'inherit',
  size = 16,
  ...props
}) => {
  const { className, style } = props;

  return (
    <div className={classNames(s.icon, className)} style={{ color, ...style }}>
      <svg width={size} height={size}>
        <use xlinkHref={`${IconsSVG}#${name}`} />
      </svg>
    </div>
  );
};
