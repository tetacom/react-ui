import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type InputRef = HTMLInputElement;
export type TextareaRef = HTMLTextAreaElement;

export type SizeType = 'small' | 'middle' | 'large';
export type ShapeType = 'brick' | 'round' | 'circle';
export type LabelPositionType = 'top' | 'left';

interface BseInput {
  // Исходное входное содержимое
  defaultValue?: string;

  // Значение входного содержимого
  value?: string | number;

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
  rightIcons?: React.ReactElement[];

  // Обратный вызов при вводе пользователем
  onChange?: (value: string) => void;

  // Функция обратного вызова, которая срабатывает при нажатии клавиши Enter.
  onPressEnter?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

type OmitFields = 'defaultValue' | 'value' | 'size' | 'onChange';

export interface InputProps
  extends Omit<InputHTMLAttributes<InputRef>, OmitFields>,
    BseInput {}

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<TextareaRef>, OmitFields>,
    BseInput {
  height?: React.CSSProperties['height'];
}
