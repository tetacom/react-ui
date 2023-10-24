import React, { useMemo } from 'react';
import { HeaderGroup, RowData } from '@tanstack/react-table';

import { LockedColumn } from './model/public-api';

export type LockedColumnType = {
  lockedValue: LockedColumn;
  isExtreme: boolean;
  variables: React.CSSProperties;
};

export function useStickyStyles(
  headerGroups: HeaderGroup<RowData>[],
  tableWidth: number,
): Map<string, LockedColumnType> {
  return useMemo(() => {
    const lockedColumnsVariables = new Map();

    headerGroups.forEach((headerGroup) => {
      return headerGroup.headers
        .filter((header) => {
          const locked =
            header.column.columnDef.meta?.tableColumn.locked ??
            LockedColumn.none;
          return locked === LockedColumn.left || locked === LockedColumn.right;
        })
        .forEach((header, index, headers) => {
          const stickyStyles = getStickyStyles({
            columnLocked:
              header.column.columnDef.meta?.tableColumn.locked ??
              LockedColumn.none,
            prevColumnLocked:
              headers[index - 1]?.column.columnDef.meta?.tableColumn.locked ??
              LockedColumn.none,
            nextColumnLocked:
              headers[index + 1]?.column.columnDef.meta?.tableColumn.locked ??
              LockedColumn.none,
            columnStart: header.getStart(),
            columnWidth: header.getSize(),
            tableWidth,
          });

          lockedColumnsVariables.set(header.column.id, stickyStyles);
        });
    });

    return lockedColumnsVariables;
  }, [headerGroups, tableWidth]);
}

function getStickyStyles({
  columnLocked,
  prevColumnLocked,
  nextColumnLocked,
  columnStart,
  columnWidth,
  tableWidth,
}: {
  columnLocked: LockedColumn | boolean;
  prevColumnLocked: LockedColumn | boolean;
  nextColumnLocked: LockedColumn | boolean;
  columnStart: number;
  columnWidth: number;
  tableWidth: number;
}): LockedColumnType {
  let left;
  let right;
  let isExtreme = false;

  if (columnLocked === LockedColumn.left) {
    left = `${columnStart}px`;

    const isExtremeLeftColumn = nextColumnLocked !== LockedColumn.left;
    if (isExtremeLeftColumn) {
      isExtreme = true;
    }
  }
  if (columnLocked === LockedColumn.right) {
    right = `${tableWidth - (columnStart + columnWidth)}px`;

    const isExtremeRightColumn = prevColumnLocked !== LockedColumn.right;
    if (isExtremeRightColumn) {
      isExtreme = true;
    }
  }

  return {
    lockedValue:
      typeof columnLocked !== 'boolean' ? columnLocked : LockedColumn.none,
    isExtreme,
    variables: {
      '--sticky-left': left ?? 'auto',
      '--sticky-right': right ?? 'auto',
    } as React.CSSProperties,
  };
}
