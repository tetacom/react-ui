import { PropsWithChildren, ReactElement } from 'react';
import { Placement } from 'react-laag';

export interface DropdownProps extends PropsWithChildren {
  // Содержимое выпадающего окна
  dropdown: ReactElement;

  // Позиционирование выпадающего окна
  placement?: Placement;

  // Автоматическое позиционирование выпадающего окна
  autoPlacement?: boolean;

  // Открыто ли выпадающее окно в данный момент
  open?: boolean;
}
