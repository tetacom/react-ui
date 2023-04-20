import { ButtonHTMLAttributes } from 'react';
import { TableColumn } from './table-column';

export type TableRef = HTMLTableElement;

export interface TableProps extends ButtonHTMLAttributes<TableRef> {
  dataSource: object[];
  columns: TableColumn[];
}
