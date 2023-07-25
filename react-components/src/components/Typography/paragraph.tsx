import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { BaseProps } from './model';
import { DEFAULT_TYPE_FACE, typoClasses } from './constants';
import s from './style.module.scss';

type ParagraphRef = HTMLParagraphElement;
export const Paragraph = forwardRef<ParagraphRef, BaseProps>(
  (
    {
      children,
      fontVariant = DEFAULT_TYPE_FACE,
      resetMargin = false,
      className,
      ...props
    },
    ref,
  ) => (
    <p
      {...props}
      ref={ref}
      className={classNames(
        s.typo,
        typoClasses[fontVariant],
        resetMargin && s.resetMargin,
        className,
      )}
    >
      {children}
    </p>
  ),
);
