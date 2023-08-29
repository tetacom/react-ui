import React, { memo, useState } from 'react';
import { Input } from 'tetacom/react-components';
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

  return (
    <>
      {isEdit ? (
        <Input
          value={innerValue}
          autoFocus
          tabIndex={cellIndex}
          onBlur={() => meta?.valueChanged(innerValue)}
          onChange={setInnerValue}
          shape="brick"
          size="small"
        />
      ) : (
        <div tabIndex={cellIndex}>{value}</div>
      )}
    </>
  );
}
