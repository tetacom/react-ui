import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { LinkProps } from './model';
import { DEFAULT_TYPE_FACE, typoClasses } from './constants';
import s from './style.module.scss';

type LinkRef = HTMLAnchorElement;
export const Link = forwardRef<LinkRef, LinkProps>(
  ({ children, fontVariant = DEFAULT_TYPE_FACE, className, ...props }, ref) => (
    <a
      {...props}
      ref={ref}
      className={classNames(s.typo, typoClasses[fontVariant], className)}
    >
      {children}
    </a>
  ),
);
