import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { BaseProps, Levels } from './types';
import { levelClasses, typoClasses } from './constants';

interface TitleProps extends BaseProps {
  level?: Levels;
}

type TitleRef = HTMLHeadingElement;

export const Title = forwardRef<TitleRef, TitleProps>(
  ({ children, fontVariant = null, level = 1, className, ...props }, ref) => {
    const titleClassname = fontVariant
      ? typoClasses[fontVariant]
      : levelClasses[level];

    return React.createElement(
      `h${level}`,
      { ...props, ref, className: classNames(titleClassname, className) },
      children,
    );
  },
);
