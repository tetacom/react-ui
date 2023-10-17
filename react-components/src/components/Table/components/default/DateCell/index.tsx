import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/plugin/utc';

import { ICellComponent } from '../../../model/i-cell-component';
import { EditStringCell } from '../../EditStringCell';

export function DateCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
  dateFormat,
  utcOffset,
}: React.PropsWithoutRef<ICellComponent<string>>) {
  const value = row.getValue<string>(column.id);
  const [innerValue, setInnerValue] = useState(value);
  const { meta } = table.options;

  const dayjsValue = utcOffset
    ? dayjs.utc(value).utcOffset(utcOffset.offset, utcOffset.saveLocalTime)
    : dayjs(value);

  return isEdit ? (
    <EditStringCell
      value={innerValue}
      tabIndex={cellIndex}
      onBlur={() => meta?.valueChanged(innerValue)}
      onChange={setInnerValue}
    />
  ) : (
    <div tabIndex={cellIndex}>
      {dateFormat ? dayjsValue.locale('ru').format(dateFormat) : value}
    </div>
  );
}
