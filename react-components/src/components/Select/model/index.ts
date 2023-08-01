import { InputProps } from '../../Input/model';
import React from 'react';

export type BaseSelectProps = { key: string; headline: string };
export interface SelectProps<T extends BaseSelectProps> extends InputProps {
  // Список опции селекта
  items: Array<T>;

  // Показать "Не выбрано"
  allowNull?: boolean;

  // Обратный вызов при вводе пользователем
  onChangeItem?: (item: T) => void;

  // Обратный вызов для кастомного рендера
  onItemRender?: (item: T) => React.ReactElement;
}
