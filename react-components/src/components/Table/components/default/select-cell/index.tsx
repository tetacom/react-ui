import React, { useEffect, useState } from 'react';
import { Select } from '../../../../Select';
import { ICellComponent } from '../../../model/i-cell-component';
import { BaseSelectProps } from '../../../../Select/model/base-select-item';

export function SelectCell({
  table,
  column,
  dict,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  let options: Array<BaseSelectProps> = [];

  if (dict !== null && column.columnDef.meta) {
    options = Object.hasOwn(dict, column.columnDef.meta.tableColumn.filterField)
      ? dict[column.columnDef.meta.tableColumn.filterField].map(
          (option): BaseSelectProps => {
            return {
              key: option.id.toString(),
              headline: option.name,
            };
          },
        )
      : [];
  }

  const rawValue = row.getValue<number>(column.id);
  const foundValue = options.find(
    (option) => option.key === rawValue.toString(),
  );
  const [innerValue, setInnerValue] = useState(foundValue);
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setOpen(isEdit);
  }, [isEdit]);

  const { meta } = table.options;

  return isEdit ? (
    <Select
      open={open}
      items={options}
      value={innerValue}
      autoFocus
      tabIndex={cellIndex}
      onChangeItem={(item) => {
        setInnerValue(item);
        setOpen(undefined);
        if (innerValue?.key) {
          meta?.valueChanged({
            ...row.original,
            [column.id]: parseInt(innerValue.key, 10),
          });
        }
      }}
      shape="brick"
      size="small"
    />
  ) : (
    <div tabIndex={cellIndex}>{innerValue?.headline}</div>
  );
}
