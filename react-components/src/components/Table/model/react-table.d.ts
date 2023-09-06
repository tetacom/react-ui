import { RowData } from '@tanstack/react-table';
import { ICellEvent } from './i-cell-event';
import { TableColumn } from 'tetacom/react-components';

declare module '@tanstack/react-table' {
  interface TableMeta<T extends RowData> {
    currentEditCell: ICellEvent | null;
    startEditCell: (event: ICellEvent | null) => void;
    valueChanged: (value: T) => void;
  }

  interface ColumnMeta {
    tableColumn: TableColumn;
  }
}
