import { CSSProperties, PropsWithChildren } from 'react';
import { Placement } from '@floating-ui/react';

export interface TooltipProps extends PropsWithChildren {
  // Текст, отображаемый во всплывающей подсказке
  title: string;

  // Позиционирование высплывающего окна
  placement?: Placement;

  // Отступ от компонента, из которого появляется всплывающее окно
  offset?: number;

  // Контролируемое состояние открытия/закрытия
  open?: boolean;

  // Событие для показа подсказки
  target?: 'click' | 'hover';

  // Задержка отображения подсказки в миллисекундах
  delay?: number;

  // Показывать всплывающее окно рядом с указателм мыши
  mouseFollow?: boolean;

  // Максимальная ширина всплывающего окна
  maxWidth?: CSSProperties['maxWidth'];

  // Положение всплывающего окна и его дочерних элементов по оси z
  zIndex?: CSSProperties['zIndex'];
}
