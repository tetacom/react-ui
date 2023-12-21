import { Row } from '@tanstack/react-table';

function list(row: Row<any>, columnId: string, filterValue: number[]): boolean {
  return filterValue.includes(row.original?.[columnId]);
}

function boolean(
  row: Row<any>,
  columnId: string,
  filterValue: number[],
): boolean {
  return filterValue.includes(Number(row.original?.[columnId]));
}

export const Filters = {
  list,
  boolean,
};
