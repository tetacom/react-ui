import { FilterType, LockedColumn } from '../model/public-api';
import { StringCell } from '../components/default/StringCell';
import { DateCell } from '../components/default/DateCell';
import { SelectCell } from '../components/default/SelectCell';
import { ICellEvent } from '../model/i-cell-event';
import { CustomCellComponent } from '../model/cell-component';
import { NumberCell } from '../components/default/NumberCell';

import s from '../style.module.scss';

const cellComponentsMap: Map<FilterType, CustomCellComponent> = new Map<
  FilterType,
  CustomCellComponent
>()
  .set(FilterType.string, StringCell)
  .set(FilterType.number, NumberCell)
  .set(FilterType.list, SelectCell)
  .set(FilterType.date, DateCell);

export const getCellComponent = (filterType: FilterType) =>
  cellComponentsMap.has(filterType)
    ? cellComponentsMap.get(filterType)
    : StringCell;

export function findCell(event: Event): HTMLElement | null {
  return event.composedPath().find((target: any) => {
    return target.tagName?.toLowerCase() === 'td';
  }) as HTMLElement;
}

export function getCoordinates(event: Event): ICellEvent | null {
  const cell = findCell(event);
  if (cell) {
    const rowIndex = parseInt(cell.getAttribute('data-row')!, 10);
    const columnName = cell.getAttribute('data-column')!;

    if (rowIndex >= 0 && columnName) {
      return {
        event,
        row: rowIndex,
        column: columnName,
      };
    }
  }
  return null;
}

export function eventIsOnRow(event: Event): boolean {
  const row = event.composedPath().find((target) => {
    return (target as HTMLElement)?.getAttribute?.('data-row');
  });

  return Boolean(row);
}

export const lockedClasses: Record<
  LockedColumn,
  null | { head: string; body: string }
> = {
  [LockedColumn.none]: null,
  [LockedColumn.left]: {
    head: s.lockedHeadLeft,
    body: s.lockedBodyLeft,
  },
  [LockedColumn.right]: {
    head: s.lockedHeadRight,
    body: s.lockedBodyRight,
  },
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
