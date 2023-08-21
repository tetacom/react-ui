import { useMemo } from 'react';
import { VisibilityState } from '@tanstack/react-table';

import { TableColumn } from './model/public-api';

export const useColumnVisibility = (
  columns: TableColumn[],
  hiddenColumnNames: string[],
): VisibilityState => {
  return useMemo(() => {
    const mergedColumns = columns.map((item) => {
      const hasThisField = item.hidden || hiddenColumnNames.includes(item.name);
      return { ...item, hidden: hasThisField };
    });
    const colsVisibility: VisibilityState = {};

    mergedColumns.forEach(({ name, hidden }) => {
      colsVisibility[name] = !hidden;
    });

    return colsVisibility;
  }, [columns, hiddenColumnNames.length]);
};
