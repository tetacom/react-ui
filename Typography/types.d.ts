import { AnchorHTMLAttributes, HTMLAttributes } from 'react';
export type FontVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title1' | 'title2' | 'title3' | 'body1' | 'body2' | 'body3' | 'caption' | 'captionSemi' | 'overline';
export type Levels = 1 | 2 | 3 | 4 | 5 | 6;
type Base = {
    fontVariant?: FontVariant;
};
export type BaseProps = Base & HTMLAttributes<HTMLElement>;
export type LinkProps = Base & AnchorHTMLAttributes<HTMLAnchorElement>;
export {};
