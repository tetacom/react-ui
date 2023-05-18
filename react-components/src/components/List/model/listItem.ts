import React from 'react';

export interface ListItem {
  // Уникальный идентификатор пункта списка
  key: string;

  // Текст заголовка пункта списка
  headline: string;

  // Текст описания пункта списка
  caption?: string;

  // TODO изображение временно строка, позже переделать на возможность передавать компонент аватара
  // Изображение пункта списка
  picture?: string;

  // Левая икнока пункта списка
  leftIcon?: React.ReactElement;

  // Правая икнока пункта списка
  rightIcon?: React.ReactElement;

  // Неактивный пункт списка
  disabled?: boolean;
}
