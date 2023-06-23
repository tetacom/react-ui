import { HTMLAttributes } from 'react';
import { TableColumn } from './table-column';
import { DictionaryType } from './dictionary';

export type TableRef = HTMLTableElement;

export interface TableProps<T> extends HTMLAttributes<TableRef> {
  // Массив записей данных для отображения
  dataSource: Array<T>;

  // Столбцы таблицы
  columns: TableColumn[];

  // Зафиксировать шапку при скролле
  sticky?: boolean;

  // Словать
  dictionary?: DictionaryType;

  // Установить статус загрузки таблицы
  loading?: boolean;
}
