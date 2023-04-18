import React, { FC } from 'react';

import IconsSVG from '../../assets/color-icons.svg';
import { BaseProps } from './model';
import s from './style.module.scss';

export const ColoredIcon: FC<BaseProps> = ({ name, size = 16, ...props }) => (
  <div className={s.icon}>
    <svg {...props} width={size} height={size}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  </div>
);
