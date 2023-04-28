import { InputHTMLAttributes, PropsWithChildren } from 'react';

export type RadioRef = HTMLInputElement;

export interface RadioProps extends InputHTMLAttributes<RadioRef> {
  checked?: boolean;
}

export type RadioValueType = string | number;

export interface RadioGroupProps extends PropsWithChildren {
  value: RadioValueType;
  onChange: (value: RadioValueType) => void;
}
