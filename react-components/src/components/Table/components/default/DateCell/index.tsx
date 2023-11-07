import React, { useState } from 'react';
import dayjs from 'dayjs';

import { ICellComponent } from '../../../model/i-cell-component';
import { EditStringCell } from '../../BaseStringCell';

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

  if (!value) {
    return <div tabIndex={cellIndex}>{value}</div>;
  }

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
