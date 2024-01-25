import React, { useEffect, useState } from 'react';

import { ICellComponent } from '../../../model/public-api';
import { Input } from '../../../../Input';

export function DateCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  const value = row.getValue<string | null>(column.id);
  const [innerValue, setInnerValue] = useState<string>(value ?? '');
  const { meta } = table.options;

  useEffect(() => {
    if (value) {
      setInnerValue(value);
    }
  }, [value]);

  if (!isEdit) {
    return (
      <div tabIndex={cellIndex}>
        {column.columnDef.meta?.tableColumn.formatter?.(value) ?? value}
      </div>
    );
  }

  return (
    <Input.Text
      value={innerValue}
      tabIndex={cellIndex}
      autoFocus
      placeholder=""
      onBlur={() =>
        meta?.valueChanged({ ...row.original, [column.id]: innerValue })
      }
      onChange={(value) => setInnerValue(value)}
      type="date"
      shape="brick"
      size="small"
      height="100%"
    />
  );
}
