import { HTMLAttributes } from 'react';

import { TableColumn } from './table-column';
import { IDictionary } from './dictionary';

export type TableRef = HTMLTableElement;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface TableProps<T> extends HTMLAttributes<TableRef> {
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

  // Событие клика по строке
  onClick?: (row: T) => void;
}
