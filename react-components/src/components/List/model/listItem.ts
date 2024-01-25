import React from 'react';

export type PictureType = 'small' | 'large';

export interface ListItem {
  // Уникальный идентификатор пункта списка
  keyValue: string;

  // Текст заголовка пункта списка
  headline: string;

  // Текст описания пункта списка
  caption?: string;

  // Изображение пункта списка
  picture?: string;

  // Левая икнока пункта списка
  leftIcon?: React.ReactElement;

  // Правая икнока пункта списка
  rightIcon?: React.ReactElement;

  // Неактивный пункт списка
  disabled?: boolean;
}
