import { CSSProperties, PropsWithChildren } from 'react';

type DirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type AlignType = 'stretch' | 'start' | 'end' | 'center' | 'baseline';

export interface StackProps extends PropsWithChildren {
  direction?: DirectionType;
  align?: AlignType;
  size?: number;
  divider?: boolean;
  wrap?: boolean;
  block?: boolean;
  className?: string;
  style?: CSSProperties;
}
