import React, { CSSProperties } from 'react';

export type ShapeType = 'brick' | 'round' | 'circle';
type SizeType = '26' | '28' | '32' | '44' | '64' | '128' | '200';

export interface AvatarProps {
  name: string;
  picture?: string | React.ReactElement;
  alt?: string;
  srcSet?: string;
  shape?: ShapeType;
  size?: SizeType | number;
  className?: string;
  style?: CSSProperties;
}
