import React from 'react';

export interface ThemeProps extends React.PropsWithChildren {
  // тема / название класса по умолчанию
  defaultTheme: string;

  // ключ в локальном хранилище
  localStorageKey?: string;
}
