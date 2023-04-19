import { HTMLAttributes } from 'react';

export interface SpinnerProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className' | 'style'> {
  size?: number;
  color?: string;
}
