import { InputHTMLAttributes } from 'react';

export type InputRef = HTMLInputElement;

export type SizeType = 'small' | 'middle' | 'large';
export type ShapeType = 'brick' | 'round' | 'circle';

export interface InputProps extends InputHTMLAttributes<InputRef> {
  fieldSize?: SizeType;
  shape?: ShapeType;
  errorMessage?: string;
}
