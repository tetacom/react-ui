import { TableColumn } from 'tetacom/react-components';
import { CellContext } from '@tanstack/react-table';

export interface ICellInstance<T> {
  row: T;
  column: TableColumn;
}

export interface ICellInstanceEvent<T> extends ICellInstance<T> {
  event: Event;
}

export interface ICellInstanceValue<T> extends ICellInstance<T> {
  value: any;
}

export interface ICustomCell<T> {
  value: any;
  info?: CellContext<T, number>;
}
