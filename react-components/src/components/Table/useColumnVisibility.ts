import { useMemo } from 'react';
import { VisibilityState } from '@tanstack/react-table';

import { TableColumn } from './model/public-api';

export const useColumnVisibility = (
  columns: TableColumn[],
): VisibilityState => {
  return useMemo(() => {
    const mergedColumns = columns.map((item) => ({
      ...item,
      hidden: item.hidden || false,
    }));
    const colsVisibility: VisibilityState = {};

    mergedColumns.forEach(({ name, hidden }) => {
      colsVisibility[name] = !hidden;
    });

    return colsVisibility;
  }, [columns]);
};
