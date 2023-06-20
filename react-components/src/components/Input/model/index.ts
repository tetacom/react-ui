import React, { InputHTMLAttributes } from 'react';

export type InputRef = HTMLInputElement;

export type SizeType = 'small' | 'middle' | 'large';
export type ShapeType = 'brick' | 'round' | 'circle';
export type LabelPositionType = 'top' | 'left';

export interface InputProps
  extends Omit<InputHTMLAttributes<InputRef>, 'size' | 'onChange'> {
  // Исходное входное содержимое
  defaultValue?: string;

  // Значение входного содержимого
  value?: string;

  // Только для чтения
  readonly?: boolean;

  // Размер поля ввода. Примечание: по умолчанию используется средний размер
  size?: SizeType;

  // Установить форму текстового поля
  shape?: ShapeType;

  // Подписи к текстовому полю
  label?: string;

  // Подписи к текстовому полю
  labelPosition?: LabelPositionType;

  // Короткая подсказка (слово или фраза), когда поле для ввода пустует
  placeholder?: string;

  // Сообщение об ошибке
  errorMessage?: string;

  // Если разрешить удаление входного содержимого с помощью значка очистки
  allowClear?: boolean;

  // Отключен ли ввод
  disabled?: boolean;

  // Максимальное количество символов во вводе
  maxLength?: number;

  // Иконка текстового поля
  icon?: React.ReactElement;

  // Обратный вызов при вводе пользователем
  onChange?: (value: string) => void;

  // Функция обратного вызова, которая срабатывает при нажатии клавиши Enter.
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
