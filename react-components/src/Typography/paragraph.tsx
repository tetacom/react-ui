import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { BaseProps } from './types';
import { DEFAULT_TYPE_FACE, typoClasses } from './constants';

type ParagraphRef = HTMLParagraphElement;
export const Paragraph = forwardRef<ParagraphRef, BaseProps>(
  ({ children, fontVariant = DEFAULT_TYPE_FACE, className, ...props }, ref) => (
    <p
      {...props}
      ref={ref}
      className={classNames(typoClasses[fontVariant], className)}
    >
      {children}
    </p>
  ),
);
