import React, { CSSProperties } from 'react';

type PlacementType = 'top' | 'right' | 'bottom' | 'left';

export interface DrawerProps {
  // Видна ли боковая панель или нет
  open: boolean;

  // Укажите функцию, которая будет вызываться, когда пользователь нажимает кнопку закрытия
  onClose: () => void;

  // Наименование иконки закрытия боковой панели
  closeIconName?: string;

  // Заголовок боковой панели
  title?: string;

  // Размещение бововой панели
  placement?: PlacementType;

  // Рабочая зона
  extra?: React.ReactElement[];

  // Ширина боковой панели
  width?: CSSProperties['width'];

  // Высота боковой панели
  height?: CSSProperties['width'];

  // Положение боковой панели и ее дочерних элементов по оси z
  zIndex?: CSSProperties['zIndex'];

  // Стили боковой панели
  style?: React.CSSProperties;

  // Дополнительный класс боковой панели
  className?: string;
}
