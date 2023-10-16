import React, { useState } from 'react';

import { EditStringCell } from '../../EditStringCell';
import { ICellComponent } from '../../../model/i-cell-component';

import numberStyles from './style.module.scss';

export function NumberCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
  roundToDecimalPlaces,
}: React.PropsWithoutRef<ICellComponent<string | number | null>>) {
  const value = row.getValue<string | number>(column.id);
  const [innerValue, setInnerValue] = useState(String(value));
  const { meta } = table.options;

  let cellNumber = value;
  if (
    roundToDecimalPlaces !== undefined &&
    value !== null &&
    isNumber(value) &&
    value % 1 !== 0
  ) {
    cellNumber = isNumber(cellNumber)
      ? cellNumber.toFixed(roundToDecimalPlaces)
      : cellNumber;
  }

  return isEdit ? (
    <EditStringCell
      value={innerValue}
      tabIndex={cellIndex}
      onBlur={() => meta?.valueChanged(innerValue)}
      onChange={setInnerValue}
    />
  ) : (
    <div tabIndex={cellIndex} className={numberStyles.root}>
      {cellNumber ? showNumberWithSpaces(cellNumber) : cellNumber}
    </div>
  );
}

function showNumberWithSpaces(value: number | string): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function isNumber(value: number | string): value is number {
  return typeof value === 'number';
}
