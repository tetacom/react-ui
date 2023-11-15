import { RowData } from '@tanstack/react-table';
import { ICellEvent } from './i-cell-event';
import { TableColumn } from '../model/public-api';

import '@tanstack/react-table';
declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    currentEditCell: ICellEvent | null;
    startEditCell: (event: ICellEvent | null) => void;
    valueChanged: (value: TData) => void;
  }
  interface ColumnMeta {
    tableColumn: TableColumn;
  }
}
