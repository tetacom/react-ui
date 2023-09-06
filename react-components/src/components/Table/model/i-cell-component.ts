import { Column, Row, Table } from '@tanstack/react-table';
import { IDictionary } from 'tetacom/react-components';

export interface ICellComponent<T = any> {
  row: Row<T>;
  column: Column<T>;
  table: Table<T>;
  dict: IDictionary<T> | null;
  isEdit: boolean;
  cellIndex: number;
}
