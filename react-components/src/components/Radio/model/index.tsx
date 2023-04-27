import React, { InputHTMLAttributes, PropsWithChildren } from 'react';

export type RadioRef = HTMLInputElement;

export interface RadioProps
  extends Omit<InputHTMLAttributes<RadioRef>, 'onChange'> {
  checked?: boolean;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export type RadioValue = string | number;

export interface RadioGroupProps extends PropsWithChildren {
  value: RadioValue;
  onChange: (value: RadioValue) => void;
}
