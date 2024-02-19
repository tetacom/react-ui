import React from 'react';

import { InputProps } from '../../Input/model';
import { BaseSelectProps } from './base-select-item';

export interface SelectProps<T extends BaseSelectProps>
  extends Omit<InputProps, 'value'> {
  // Значение селекта
  value?: T | null;

  // Список опции селекта
  items: Array<T>;

  // Показать "Не выбрано"
  allowNull?: boolean;

  // Контролируемое состояние селекта
  open?: boolean;

  // Обратный вызов при вводе пользователем
  onChangeItem?: (item: T | null) => void;

  // Обратный вызов для кастомного рендера
  onItemRender?: (item: T) => React.ReactElement;

  // Положение селекта и его дочерних элементов по оси z
  zIndex?: React.CSSProperties['zIndex'];

  // Всегда показывать все возможные варианты списка
  showAllOptions?: boolean;
}
