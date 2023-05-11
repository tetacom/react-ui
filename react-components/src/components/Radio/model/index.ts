import { InputHTMLAttributes, PropsWithChildren } from 'react';

export type RadioRef = HTMLInputElement;

export interface RadioProps extends InputHTMLAttributes<RadioRef> {
  // Указывает, выбрана ли радио кнопка
  checked?: boolean;
}

export type RadioValueType = string | number;

export interface RadioGroupProps extends PropsWithChildren {
  // Используется для установки текущего выбранного значения
  value: RadioValueType;

  // Функция обратного вызова, которая срабатывает при изменении состояния
  onChange: (value: RadioValueType) => void;
}
