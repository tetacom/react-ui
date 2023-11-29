import React, { useState } from 'react';

import { EditStringCell } from '../base-string-cell';
import { ICellComponent } from '../../../model/public-api';

import numberStyles from './style.module.scss';

export function NumberCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  const value = row.getValue<number | null>(column.id);
  const [innerValue, setInnerValue] = useState<number | null>(value);
  const { meta } = table.options;

  const valueChange = (value: object) => {
    meta?.valueChanged(value);
  };

  return isEdit ? (
    <EditStringCell
      value={innerValue || innerValue === 0 ? innerValue.toString() : ''}
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
    <div tabIndex={cellIndex} className={numberStyles.root}>
      {column.columnDef.meta?.tableColumn.formatter?.(value) ?? value}
    </div>
  );
}
