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
  errorMessage?: string | null;

  // Отключен ли ввод
  disabled?: boolean;

  // Максимальное количество символов во вводе
  maxLength?: number;

  // Название левой иконки
  leftIconName?: string;

  // Правая иконки
  rightIcon?: {
    // Название правой иконки
    icon: string | React.ReactElement;

    // Функция обратного вызова при клике по правой иконке
    onClick?: () => void;
  };

  // Обратный вызов при вводе пользователем
  onChange?: (value: string) => void;

  // Функция обратного вызова, которая срабатывает при нажатии клавиши Enter.
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
