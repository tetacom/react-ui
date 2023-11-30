import React, { useEffect, useState } from 'react';

import { EditStringCell } from '../base-string-cell';
import { ICellComponent } from '../../../model/public-api';

export function NumberCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  const value = row.getValue<number | null>(column.id);
  const [innerValue, setInnerValue] = useState(value);
  const { meta } = table.options;

  const valueChange = (value: object) => {
    meta?.valueChanged(value);
  };

  useEffect(() => {
    if (innerValue === null || innerValue === undefined) {
      setInnerValue(0);
    }
  }, []);

  if (innerValue === null || innerValue === undefined) return null;

  return isEdit ? (
    <EditStringCell
      value={innerValue}
      tabIndex={cellIndex}
      placeholder={column.columnDef.meta?.tableColumn?.caption}
      onBlur={() => valueChange({ ...row.original, [column.id]: innerValue })}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          valueChange({ ...row.original, [column.id]: innerValue });
        }
      }}
      onChange={(e) => setInnerValue(parseFloat(e))}
    />
  ) : (
    <div tabIndex={cellIndex}>
      {column.columnDef.meta?.tableColumn.formatter?.(value) ?? value}
    </div>
  );
}
