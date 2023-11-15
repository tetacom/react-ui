import React, { useState } from 'react';

import { EditStringCell } from '../base-string-cell';
import { ICellComponent } from '../../../model/i-cell-component';

import numberStyles from './style.module.scss';

export function NumberCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
  roundToDecimalPlaces,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  const value = row.getValue<number | null>(column.id);
  const [innerValue, setInnerValue] = useState<number | null>(value);
  const { meta } = table.options;

  // let cellNumber = value;
  // if (
  //   roundToDecimalPlaces !== undefined &&
  //   value !== null &&
  //   isNumber(value) &&
  //   value % 1 !== 0
  // ) {
  //   cellNumber = isNumber(cellNumber)
  //     ? cellNumber.toFixed(roundToDecimalPlaces)
  //     : cellNumber;
  // }

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

function showNumberWithSpaces(value: number | string): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function isNumber(value: number | string): value is number {
  return typeof value === 'number';
}
