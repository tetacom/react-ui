import { InputHTMLAttributes } from 'react';

export type CheckboxRef = HTMLInputElement;

export interface CheckboxProps extends InputHTMLAttributes<CheckboxRef> {
  checked?: boolean;
}
