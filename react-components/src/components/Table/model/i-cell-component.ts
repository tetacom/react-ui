import { Column, Row, Table } from '@tanstack/react-table';
import { IIdName } from 'tetacom/react-components';

export interface ICellComponent<T = any> {
  row: Row<T>;
  column: Column<T>;
  table: Table<T>;
  dict: Array<IIdName<T>>;
  isEdit: boolean;
  cellIndex: number;
}
