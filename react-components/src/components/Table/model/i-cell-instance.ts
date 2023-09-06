import { IDictionary, TableColumn } from '../model/public-api';
import { Row } from '@tanstack/react-table';

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
  row: Row<T>;
  dict?: IDictionary<T> | null;
}
