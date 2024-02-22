import { Row } from '@tanstack/react-table';
import dayjs from 'dayjs';

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

function date(
  row: Row<any>,
  columnId: string,
  filterValue: [string | undefined, string | undefined] | undefined | null,
): boolean {
  if (!filterValue) return true;

  const currentValue = row.original?.[columnId] as string;
  if (currentValue === undefined || currentValue === null) return false;

  const [from, to] = filterValue;
  const fromDate = dayjs(from);
  const toDate = dayjs(to);
  const currentDate = dayjs(currentValue);

  if (!from && !to) return true;
  if (from && !to) return currentDate.diff(fromDate) >= 0;
  if (!from && to) return currentDate.diff(toDate) <= 0;
  return currentDate.diff(fromDate) >= 0 && currentDate.diff(toDate) <= 0;
}

export const Filters = {
  list,
  boolean,
  string,
  date,
};
