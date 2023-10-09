import { TableColumn } from './public-api';

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
