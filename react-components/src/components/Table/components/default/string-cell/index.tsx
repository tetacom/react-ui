import React, { useState } from 'react';

import { ICellComponent } from '../../../model/i-cell-component';
import { EditStringCell } from '../base-string-cell';

export function StringCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  const value = row.getValue<string>(column.id);
  const [innerValue, setInnerValue] = useState(value);
  const { meta } = table.options;

  const valueChange = (value: object) => {
    meta?.valueChanged(value);
  };

  return isEdit ? (
    <EditStringCell
      value={innerValue}
      tabIndex={cellIndex}
      onBlur={() =>
        valueChange({ ...row.original, [column.id]: innerValue.toString() })
      }
      onPressEnter={() => {
        valueChange({ ...row.original, [column.id]: innerValue.toString() });
      }}
      onChange={setInnerValue}
    />
  ) : (
    <div tabIndex={cellIndex}>{value}</div>
  );
}