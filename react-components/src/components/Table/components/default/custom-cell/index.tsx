import React from 'react';

import { ICellComponent } from '../../../model/public-api';

export function CustomCell({
  column,
  row,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  const value = row.getValue<unknown>(column.id);
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}
