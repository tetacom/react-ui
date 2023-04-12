import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { BaseProps } from './types';
import { DEFAULT_TYPE_FACE, typoClasses } from './constants';

type TextRef = HTMLSpanElement;
export const Text = forwardRef<TextRef, BaseProps>(
  ({ children, fontVariant = DEFAULT_TYPE_FACE, className, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={classNames(typoClasses[fontVariant], className)}
    >
      {children}
    </span>
  ),
);
