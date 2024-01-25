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

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const valueChange = () => {
    const numberInnerValue = Number(innerValue);

    if (Number.isNaN(numberInnerValue)) {
      setInnerValue(value);
    } else {
      meta?.valueChanged({
        ...row.original,
        [column.id]: numberInnerValue,
      });
      setInnerValue(numberInnerValue);
    }
  };

  if (!isEdit) {
    return (
      <div tabIndex={cellIndex}>
        {column.columnDef.meta?.tableColumn.formatter?.(value) ?? value}
      </div>
    );
  }

  return (
    <EditStringCell
      value={innerValue ?? 0}
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
  );
}
