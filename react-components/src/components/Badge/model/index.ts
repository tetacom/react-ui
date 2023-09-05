import React from 'react';

export type PaletteType = 'primary' | 'green' | 'yellow' | 'red' | 'text';
export type ViewType = 'stroke' | 'fill';

export interface BadgeProps extends React.PropsWithChildren {
  palette?: PaletteType;
  view?: ViewType;
}
