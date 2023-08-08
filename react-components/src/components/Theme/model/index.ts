import React from 'react';

export interface ThemeProps extends React.PropsWithChildren {
  // тема / название класса по умолчанию
  defaultTheme?: string;

  // постфикс для ключа в локальном хранилище
  postfix: string;
}
