import React, { CSSProperties } from 'react';

export type ShapeType = 'brick' | 'round' | 'circle';
export type SizeType = '26' | '28' | '32' | '44' | '64' | '128' | '200';

export interface AvatarProps {
  // Текст внутри аватара, выводится, если отсутствует изображение. Длинные прдложения обрезаются до инициалов
  name: string;

  // Адрес изображения для аватара изображения или элемента изображения
  picture?: string | React.ReactElement;

  // Этот атрибут определяет альтернативный текст, описывающий изображение.
  alt?: string;

  // Список источников для разных разрешений экрана
  srcSet?: string;

  // Установить форму аватара
  shape?: ShapeType;

  // Размер аватара
  size?: SizeType | number;

  // Дополнительный класс аватара
  className?: string;

  // Встроенные стили аватра
  style?: CSSProperties;
}
