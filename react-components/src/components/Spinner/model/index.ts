import { HTMLAttributes } from 'react';

export interface SpinnerProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className' | 'style'> {
  // Размер спиннера
  size?: number;

  // Цвет спиннера
  color?: string;
}
