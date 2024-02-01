import { HTMLAttributes } from 'react';

export interface BaseProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className' | 'style'> {
  // Установить название иконки
  name: string;

  // Установить размер иконки
  size?: number;

  // Обратный вызов выполняется при нажатии на иконку
  onClick?: () => void;
}

export interface IconProps extends BaseProps {
  // Установить цвет икноки
  color?: string;
}
