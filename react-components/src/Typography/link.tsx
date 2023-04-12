import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { LinkProps } from './types';
import { DEFAULT_TYPE_FACE, typoClasses } from './constants';

type LinkRef = HTMLAnchorElement;
export const Link = forwardRef<LinkRef, LinkProps>(
  ({ children, fontVariant = DEFAULT_TYPE_FACE, className, ...props }, ref) => (
    <a
      {...props}
      ref={ref}
      className={classNames(typoClasses[fontVariant], className)}
    >
      {children}
    </a>
  ),
);
