import React from 'react';

export type PaletteType = 'primary' | 'green' | 'yellow' | 'red' | 'text';
export type ViewType = 'stroke' | 'fill';

export interface BadgeProps extends React.PropsWithChildren {
  // Установить цвет бейджа
  palette?: PaletteType;

  // Установить вид бейджа
  view?: ViewType;
}
