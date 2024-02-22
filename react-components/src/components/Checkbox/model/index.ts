import { CSSProperties, InputHTMLAttributes } from 'react';

import { StackProps } from '../../Stack/model';
import { CheckboxGroupItem } from './checkbox-group-item';

export type CheckboxRef = HTMLInputElement;

export interface CheckboxProps extends InputHTMLAttributes<CheckboxRef> {
  // Указывает, установлен ли флажок
  checked?: boolean;

  // Неопределенное проверенное состояние флажка
  indeterminate?: boolean;
}

export interface CheckboxGroupProps {
  // Указывает параметры
  options: CheckboxGroupItem[];

  // Выбранное значение по умолчанию
  defaultValue?: CheckboxGroupItem[];

  // Используется для установки текущего выбранного значения
  value?: CheckboxGroupItem[];

  // Свойство name всех дочерних элементов input[type="checkbox"]
  name?: string;

  // Если нужно отключить все флажки
  disabled?: boolean;

  // Направление
  direction?: StackProps['direction'];

  // Функция обратного вызова, которая срабатывает при изменении состояния
  onChange?: (checkedValue: CheckboxGroupItem[]) => void;

  // Дополнительный класс
  className?: string;

  // Встроенные стили
  style?: CSSProperties;
}
