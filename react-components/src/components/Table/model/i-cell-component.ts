import { Column, Row, Table } from '@tanstack/react-table';
import { IDictionary, UtcOffset } from '../model/public-api';

export interface ICellComponent<T> {
  row: Row<T>;
  column: Column<T>;
  table: Table<T>;
  dict: IDictionary | null;
  isEdit: boolean;
  cellIndex: number;
  dateFormat?: string;
  utcOffset?: UtcOffset;
  roundToDecimalPlaces?: number;
}
