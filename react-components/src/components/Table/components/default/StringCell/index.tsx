import React, { useState } from 'react';

import { EditStringCell } from '../../BaseStringCell';
import { ICellComponent } from '../../../model/i-cell-component';

export function StringCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<string>>) {
  const value = row.getValue<string>(column.id);
  const [innerValue, setInnerValue] = useState(value);
  const { meta } = table.options;

  return isEdit ? (
    <EditStringCell
      value={innerValue}
      tabIndex={cellIndex}
      onBlur={() => meta?.valueChanged(innerValue)}
      onChange={setInnerValue}
    />
  ) : (
    <div tabIndex={cellIndex}>{value}</div>
  );
}
