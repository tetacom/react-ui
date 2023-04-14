import React, { FC } from 'react';

import IconsSVG from '../assets/icons.svg';
import s from './style.module.scss';
import { BaseProps } from './types';

export interface IconProps extends BaseProps {
  color?: string;
}

export const Icon: FC<IconProps> = ({
  name,
  color = 'currentColor',
  size = 16,
  ...props
}) => (
  <div className={s.icon}>
    <svg {...props} fill={color} stroke={color} width={size} height={size}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  </div>
);
