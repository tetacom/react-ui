import { PropsWithChildren } from 'react';
import { Placement } from 'react-laag';

export interface TooltipProps extends PropsWithChildren {
  // Текст, отображаемый во всплывающей подсказке
  title: string;

  // Позиционирование высплывающего окна
  placement?: Placement;

  // Автоматическое позиционирование всплывающего окна
  autoPlacement?: boolean;

  // Отступ от компонента, из которого появляется всплывающее окно
  offset?: number;
}
