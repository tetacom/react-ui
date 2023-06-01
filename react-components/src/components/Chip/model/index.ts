import React, { HTMLAttributes } from 'react';

export type ChipRef = HTMLDivElement;

export type ViewType = 'default' | 'primary' | 'outline';

export interface ChipProps extends HTMLAttributes<ChipRef> {
  // Установить вид чипа
  view?: ViewType;

  // Можно ли закрыть чип
  closable?: boolean;

  // Пользовательская иконка закрытия
  closeIcon?: React.ReactElement;

  // Установить значок чипа
  icon?: React.ReactElement;

  // Установить изображение чипа
  picture?: string;

  // Обратный вызов выполняется при нажатии на чип
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  // Обратный вызов выполняется при закрытии чипа
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
}
