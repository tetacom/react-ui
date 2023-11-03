import React, { PropsWithChildren, ReactElement } from 'react';
import { Placement } from '@floating-ui/react';

export interface DropdownProps extends PropsWithChildren {
  // Содержимое выпадающего окна
  dropdown: ReactElement;

  // Позиционирование выпадающего окна
  placement?: Placement;

  // Возможные положения выпадающего окна
  possiblePlacements?: Placement[];

  // Автоматическое позиционирование выпадающего окна
  autoPlacement?: boolean;

  // Открыто ли выпадающее окно в данный момент
  open?: boolean;

  // Ресайз дропдауна при скорлле контейнера
  resizable?: boolean;

  // Ширина окна
  width?: {
    type: 'auto' | 'parent' | 'fixed';
    value?: React.CSSProperties['width'];
  };

  // Обратный вызов изменения состояния открыто/закрыто
  onOpenChange?: (event: boolean) => void;

  // Положение дропдауна и его дочерних элементов по оси z
  zIndex?: React.CSSProperties['zIndex'];

  portal?: {
    enable: boolean;
    id?: string;
    rootNode?: HTMLElement | React.MutableRefObject<HTMLElement | null>;
  };

  // Скрыть скроллбар
  hideScroll?: boolean;
}
