import { HTMLAttributes } from 'react';
import { TableColumn } from './table-column';
import { IDictionary } from 'tetacom/react-components';

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

  // Словарь
  dictionary?: IDictionary;
}
