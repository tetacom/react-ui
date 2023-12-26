import React, { FC } from 'react';
import classNames from 'classnames';

import { CardProps } from './model';

import s from './style.module.scss';

export const Card: FC<CardProps> = ({ style, className, id, children }) => {
  const classes = classNames(s.card, className);

  return (
    <div id={id} className={classes} style={style}>
      {children}
    </div>
  );
};
