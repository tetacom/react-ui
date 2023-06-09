import { PropsWithChildren } from 'react';
import { Placement } from '@floating-ui/react';

export interface TooltipProps extends PropsWithChildren {
  // Текст, отображаемый во всплывающей подсказке
  title: string;

  // Позиционирование высплывающего окна
  placement?: Placement;

  // Отступ от компонента, из которого появляется всплывающее окно
  offset?: number;
}
