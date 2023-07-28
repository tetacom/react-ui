import React from 'react';

export type ToastStateType = 'default' | 'success' | 'warning' | 'error';

export interface ToastProps extends React.PropsWithChildren {
  // Открыт ли тост
  open: boolean;

  // Обратный вызов закрытия тоста
  onClose: () => void;

  // Время автоматического закрытия тоста
  autoHideDuration?: number;

  // Заголовок
  title: string;

  // Рабочая зона
  extra?: React.ReactElement[];

  // Состояние тоста
  state?: ToastStateType;
}
