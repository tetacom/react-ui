import { PropsWithChildren, ReactElement } from 'react';
import { FloatingContext, Placement } from '@floating-ui/react';

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

  // Позиционировать окно по ширине триггера
  autoWidth?: boolean;

  // Обратный вызов изменения состояния открыто/закрыто
  onOpenChange?: (event: boolean) => void;
}
