import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { TitleProps } from './model';
import { levelClasses, typoClasses } from './constants';
import s from './style.module.scss';

type TitleRef = HTMLHeadingElement;

export const Title = forwardRef<TitleRef, TitleProps>(
  (
    {
      children,
      fontVariant = null,
      resetMargin = false,
      level = 1,
      className,
      ...props
    },
    ref,
  ) => {
    const titleClassname = fontVariant
      ? typoClasses[fontVariant]
      : levelClasses[level];

    return React.createElement(
      `h${level}`,
      {
        ...props,
        ref,
        className: classNames(
          s.typo,
          titleClassname,
          resetMargin && s.resetMargin,
          className,
        ),
      },
      children,
    );
  },
);
