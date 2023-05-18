import { InputHTMLAttributes, PropsWithChildren } from 'react';

import { RadioValueType } from './radioValueType';

export type RadioRef = HTMLInputElement;

export interface RadioProps extends InputHTMLAttributes<RadioRef> {
  // Указывает, выбрана ли радио кнопка
  checked?: boolean;
}

export interface RadioGroupProps extends PropsWithChildren {
  // Используется для установки текущего выбранного значения
  value: RadioValueType;

  // Функция обратного вызова, которая срабатывает при изменении состояния
  onChange: (value: RadioValueType) => void;
}
