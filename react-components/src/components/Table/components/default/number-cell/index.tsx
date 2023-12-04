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
  const value = row.getValue<number | string | null>(column.id);
  const [innerValue, setInnerValue] = useState(value);
  const { meta } = table.options;

  const valueChange = () => {
    if (typeof innerValue === 'string' && Number.isNaN(Number(innerValue))) {
      meta?.valueChanged({ ...row.original, [column.id]: value });
      setInnerValue(value);
    } else {
      meta?.valueChanged({
        ...row.original,
        [column.id]: innerValue === null ? innerValue : Number(innerValue),
      });
      setInnerValue(Number(innerValue));
    }
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
      onBlur={() => valueChange()}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          valueChange();
        }
      }}
      onChange={(e) => setInnerValue(e)}
    />
  ) : (
    <div tabIndex={cellIndex}>
      {column.columnDef.meta?.tableColumn.formatter?.(value) ?? value}
    </div>
  );
}
