import React, { HTMLAttributes } from 'react';

import { TableColumn } from './table-column';
import { IDictionary } from './dictionary';
import { CellParamsType } from './cell-params';
import { ICellInstance } from './i-cell-instance';

export type TableRef = HTMLTableElement;

export interface TableProps<T>
  extends Omit<HTMLAttributes<TableRef>, 'onClick'> {
  // Массив записей данных для отображения
  dataSource: Array<T>;

  // Столбцы таблицы
  columns: TableColumn[];

  // Зафиксировать шапку при скролле
  sticky?: boolean;

  // Установить заполнитель таблицы
  skeleton?: React.ReactElement | null;

  // Словарь
  dictionary?: IDictionary;

  // Настройка ячейки
  cellParams?: CellParamsType;

  // Высота таблицы
  height?: React.CSSProperties['height'];

  // Событие клика по строке
  onClick?: (cell: ICellInstance<T>) => void;

  // Выделять строчки таблицы через одну
  acrossLine?: boolean;
}
