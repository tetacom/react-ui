import React, { CSSProperties } from 'react';

export interface ResultProps {
  // Заголовок
  title?: string;

  // Подзаголдовок
  subTitle?: string;

  // Пользовательское изображение
  picture?: React.ReactElement;

  // Пользовательская иконка
  icon?: React.ReactElement;

  // Рабочая зона
  extra?: React.ReactElement[];

  // Дополнительный класс аватара
  className?: string;

  // Встроенные стили аватра
  style?: CSSProperties;
}
