import React, { useEffect, useState } from 'react';

import { ICellComponent } from '../../../model/public-api';
import { EditStringCell } from '../base-string-cell';

export function StringCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  const value = row.getValue<string | null>(column.id);
  const [innerValue, setInnerValue] = useState(value);
  const { meta } = table.options;

  const valueChange = (value: object) => {
    meta?.valueChanged(value);
  };

  useEffect(() => {
    if (innerValue === null || innerValue === undefined) {
      setInnerValue('');
    }
  }, []);

  if (innerValue === null || innerValue === undefined) return null;

  return isEdit ? (
    <EditStringCell
      placeholder={column.columnDef.meta?.tableColumn.caption}
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
