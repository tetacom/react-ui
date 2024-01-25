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
  const [innerValue, setInnerValue] = useState<string>(value ?? '');
  const { meta } = table.options;

  const valueChange = () => {
    meta?.valueChanged({ ...row.original, [column.id]: innerValue });
  };

  useEffect(() => {
    if (value) {
      setInnerValue(value);
    }
  }, [value]);

  if (!isEdit) {
    return <div tabIndex={cellIndex}>{value}</div>;
  }

  return (
    <EditStringCell
      placeholder={column.columnDef.meta?.tableColumn.caption}
      value={innerValue}
      tabIndex={cellIndex}
      onBlur={valueChange}
      onPressEnter={valueChange}
      onChange={setInnerValue}
    />
  );
}
