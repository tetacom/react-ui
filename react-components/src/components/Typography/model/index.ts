import { AnchorHTMLAttributes, HTMLAttributes } from 'react';

export type FontVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'caption'
  | 'captionBold'
  | 'overline';

export type Levels = 1 | 2 | 3 | 4 | 5 | 6;

type Base = {
  // Начертание из определенных в дизайн токенах
  fontVariant?: FontVariant;

  // Сбросить внешние отступы
  resetMargin?: boolean;
};

export type BaseProps = Base & HTMLAttributes<HTMLElement>;
export type LinkProps = Base & AnchorHTMLAttributes<HTMLAnchorElement>;

export interface TitleProps extends BaseProps {
  // Уровень заголовка
  level?: Levels;
}
