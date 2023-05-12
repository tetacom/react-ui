import React, { FC } from 'react';

import { RadioGroupProps } from './model';
import RadioGroupContextProvider from './context/provider';
import s from './group.module.scss';

export const RadioGroup: FC<RadioGroupProps> = ({
  value,
  onChange,
  children,
}) => (
  <RadioGroupContextProvider initValue={value} onChangeValue={onChange}>
    <div className={s.radioGroup}>{children}</div>
  </RadioGroupContextProvider>
);
