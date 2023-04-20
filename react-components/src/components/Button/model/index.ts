import { ButtonHTMLAttributes } from 'react';

export type ButtonRef = HTMLButtonElement;

export type PaletteType = 'green' | 'yellow' | 'red';
export type ViewType = 'primary' | 'outline' | 'ghost';
export type SizeType = 'small' | 'middle' | 'large';
export type ShapeType = 'brick' | 'round' | 'circle';

// TODO view outline желательно переименовать в secondary или в макетах secondary в outline
export interface ButtonProps extends ButtonHTMLAttributes<ButtonRef> {
  view?: ViewType;
  size?: SizeType;
  palette?: PaletteType;
  shape?: ShapeType;
  square?: boolean;
  block?: boolean;
  loading?: boolean;
}
