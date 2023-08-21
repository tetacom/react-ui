import { useMemo } from 'react';
import { VisibilityState } from '@tanstack/react-table';

import { TableColumn } from './model/public-api';

export const useColumnVisibility = (
  columns: TableColumn[],
): VisibilityState => {
  return useMemo(() => {
    const colsVisibility: VisibilityState = {};
    columns.forEach(({ name, hidden }) => {
      colsVisibility[name] = !hidden;
    });
    return colsVisibility;
  }, [columns]);
};
