import { InputHTMLAttributes } from 'react';

import { StackProps } from '../../Stack/model';

export type CheckboxRef = HTMLInputElement;

export interface CheckboxProps extends InputHTMLAttributes<CheckboxRef> {
  // Указывает, установлен ли флажок
  checked?: boolean;

  // Неопределенное проверенное состояние флажка
  indeterminate?: boolean;
}

export interface CheckboxGroupProps {
  // Указывает параметры
  options: string[];

  // Выбранное значение по умолчанию
  defaultValue?: string[];

  // Используется для установки текущего выбранного значения
  value?: string[];

  // Свойство name всех дочерних элементов input[type="checkbox"]
  name?: string;

  // Если нужно отключить все флажки
  disabled?: boolean;

  // Направление
  direction?: StackProps['direction'];

  // Функция обратного вызова, которая срабатывает при изменении состояния
  onChange?: (checkedValue: string[]) => void;
}
