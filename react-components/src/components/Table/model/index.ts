import { HTMLAttributes } from 'react';
import { TableColumn } from './table-column';

export type TableRef = HTMLTableElement;

export interface TableProps<T> extends HTMLAttributes<TableRef> {
  // Массив записей данных для отображения
  dataSource: Array<T>;

  // Столбцы таблицы
  columns: TableColumn[];

  // Зафиксировать шапку при скролле
  sticky?: boolean;

  // Установить статус загрузки таблицы
  loading?: boolean;
}
