import { IDictionary } from './dictionary';

export interface IPropertyGrid<T> {
  value: T;
  columnName?: string;
  dict?: IDictionary;
  onChange?: (value: T) => void;
}
