import { InputHTMLAttributes, PropsWithChildren } from 'react';

import { RadioValueType } from './radioValueType';

export type RadioRef = HTMLInputElement;

export interface RadioProps extends InputHTMLAttributes<RadioRef> {
  checked?: boolean;
}

export interface RadioGroupProps extends PropsWithChildren {
  value: RadioValueType;
  onChange: (value: RadioValueType) => void;
}
