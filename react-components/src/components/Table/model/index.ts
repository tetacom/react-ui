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
  dictionary?: IDictionary<T> | null;

  // Настройка ячейки
  cellParams?: CellParamsType;

  // Высота таблицы
  height?: React.CSSProperties['height'];

  // Событие клика по строке
  onClick?: (cell: ICellInstance<T>) => void;

  // Выделять строчки таблицы через одну
  acrossLine?: boolean;

  // Имя таблицы для хренения клиентских настроек в локальном хранилище
  localStorageKey?: string;

  // Обратный вызов изменения значения в ячейке таблицы
  valueChange?: (cell: ICellInstance<T>) => void;

  // Список имен столбцов, которые нужно дополнительно скрыть
  hiddenColumnNames?: string[];
}
