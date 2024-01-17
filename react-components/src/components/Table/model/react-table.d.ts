import { RowData } from '@tanstack/react-table';
import { ICellEvent } from './i-cell-event';
import { ICellInstance, IDictionary, TableColumn } from '../model/public-api';

import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    dictionary?: IDictionary | null;
    currentEditCell: ICellEvent | null;
    startEditCell: (event: ICellEvent | null) => void;
    valueChanged: (value: TData) => void;
    _onValueChanged?: (fn: (value: ICellInstance) => void) => void;
    _onDataUpdate?: (fn: (value: TData) => void) => void;
    _saveColumnsToLocalStorage: (items: Header<T, unknown>[]) => void;
  }
  interface ColumnMeta {
    tableColumn: TableColumn;
  }
}

declare module '@tanstack/table-core' {
  interface FilterFns {
    list: FilterFn<number[]>;
    boolean: FilterFn<number[]>;
  }
}
