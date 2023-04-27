import React, { InputHTMLAttributes } from 'react';

export type CheckboxRef = HTMLInputElement;

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<CheckboxRef>, 'onChange'> {
  checked: boolean;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}
