import React, { useState } from 'react';
import { ICellComponent } from '../../../model/i-cell-component';

export function DateCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  const value = row.getValue<string>(column.id);
  const [innerValue, setInnerValue] = useState<string>(value);
  const { meta } = table.options;

  return isEdit ? (
    <input
      value={innerValue}
      tabIndex={cellIndex}
      autoFocus
      style={{
        height: '100%',
        padding: 'var(--spacing-4)',
        outline: 'none',
        border: '1px solid var(--color-primary-50)',
      }}
      onBlur={() =>
        meta?.valueChanged({ ...row.original, [column.id]: innerValue })
      }
      onChange={(e) => setInnerValue(e.target.value)}
      type="date"
    />
  ) : (
    <div tabIndex={cellIndex}>
      {column.columnDef.meta?.tableColumn.formatter?.(value) ?? value}
    </div>
  );
}
