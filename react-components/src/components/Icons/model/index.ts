import { HTMLAttributes } from 'react';

export interface BaseProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className' | 'style'> {
  // Установить название иконки
  name: string;

  // Установить размер иконки
  size?: number;
}

export interface IconProps extends BaseProps {
  // Установить цвет икноки
  color?: string;
}
