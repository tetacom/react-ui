import React, { useState } from 'react';
import dayjs from 'dayjs';

import { ICellComponent } from '../../../model/i-cell-component';
import { EditStringCell } from '../../EditStringCell';

export function DateCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
  dateFormat,
}: React.PropsWithoutRef<ICellComponent<string>>) {
  const value = row.getValue<string>(column.id);
  const [innerValue, setInnerValue] = useState(value);
  const { meta } = table.options;

  return isEdit ? (
    <EditStringCell
      value={innerValue}
      tabIndex={cellIndex}
      onBlur={() => meta?.valueChanged(innerValue)}
      onChange={setInnerValue}
    />
  ) : (
    <div tabIndex={cellIndex}>
      {dateFormat ? dayjs(value).locale('ru').format(dateFormat) : value}
    </div>
  );
}
