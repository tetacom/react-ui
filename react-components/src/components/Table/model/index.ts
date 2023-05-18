import { ButtonHTMLAttributes } from 'react';
import { TableColumn } from './table-column';

export type TableRef = HTMLTableElement;

export interface TableProps extends ButtonHTMLAttributes<TableRef> {
  // Массив записей данных для отображения
  dataSource: object[];

  // Столбцы таблицы
  columns: TableColumn[];
}
