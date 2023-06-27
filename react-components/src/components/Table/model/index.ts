import { HTMLAttributes } from 'react';

import { TableColumn } from './table-column';
import { IDictionary } from './dictionary';
import { CellParamsType } from './cell-params';

export type TableRef = HTMLTableElement;

export interface TableProps<T>
  extends Omit<HTMLAttributes<TableRef>, 'onClick'> {
  // Массив записей данных для отображения
  dataSource: Array<T>;

  // Столбцы таблицы
  columns: TableColumn[];

  // Зафиксировать шапку при скролле
  sticky?: boolean;

  // Установить статус загрузки таблицы
  loading?: boolean;

  // Словарь
  dictionary?: IDictionary;

  // Настройка ячейки
  cellParams?: CellParamsType;

  // Событие клика по строке
  onClick?: (row: T) => void;
}
