import React from 'react';

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

export type LockedColumnType = { name: string; locked: LockedColumn };

export function getStickyStyles({
  columnName,
  lockedColumns,
  columnStart,
  columnWidth,
  tableWidth,
}: {
  columnName: string;
  lockedColumns: LockedColumnType[];
  columnStart: number;
  columnWidth: number;
  tableWidth: number;
}): React.CSSProperties {
  const lockedColumnType =
    lockedColumns.find(({ name }) => name === columnName)?.locked ??
    LockedColumn.none;
  const lockedColumnIndex = lockedColumns.findIndex(
    ({ name }) => name === columnName,
  );
  const bgValue = 'var(--color-text-5)';
  let left = 'auto';
  let right = 'auto';
  let borderLeft = 'auto';
  let borderRight = 'auto';
  let bgColor = 'transparent';

  if (lockedColumnType === LockedColumn.left) {
    left = `${columnStart}px`;

    const isExtremeLeftColumn =
      lockedColumns[lockedColumnIndex + 1].locked !== LockedColumn.left;
    if (isExtremeLeftColumn) {
      borderRight = '0px';
      bgColor = bgValue;
    }
  }
  if (lockedColumnType === LockedColumn.right) {
    right = `${tableWidth - (columnStart + columnWidth)}px`;

    const isExtremeRightColumn =
      lockedColumns[lockedColumnIndex - 1].locked !== LockedColumn.right;
    if (isExtremeRightColumn) {
      borderLeft = '0px';
      bgColor = bgValue;
    }
  }

  return {
    '--sticky-left': left,
    '--sticky-right': right,
    '--left-border': borderLeft,
    '--right-border': borderRight,
    '--bg-color': bgColor,
  } as React.CSSProperties;
}
