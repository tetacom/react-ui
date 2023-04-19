import { HTMLAttributes } from 'react';

export interface BaseProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className' | 'style'> {
  name: string;
  size?: number;
}

export interface IconProps extends BaseProps {
  color?: string;
}