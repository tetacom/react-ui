import React from 'react';

export type TabType = {
  // Уникальный идентификатор вкладки
  key: string;

  // Текст заголовка вкладки
  label: string | React.ReactElement;

  // Содержимое вкладки
  children?: string | React.ReactElement;

  // Неактивная вкладка
  disabled?: boolean;
};
