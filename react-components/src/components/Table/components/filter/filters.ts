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

function string(row: Row<any>, columnId: string, filterValue: string): boolean {
  const currentValue = row.original?.[columnId];
  if (currentValue === undefined || currentValue === null) return false;

  return currentValue.toLowerCase().includes(filterValue.toLowerCase());
}

export const Filters = {
  list,
  boolean,
  string,
};
