import React, { useEffect, useState } from 'react';

import { Select } from '../../../../Select';
import { BaseSelectProps } from '../../../../Select/model/public-api';
import { ICellComponent } from '../../../model/public-api';

type BoolSelectProps = BaseSelectProps & { value: boolean };
const options: Array<BoolSelectProps> = [
  { key: 'false', headline: 'Нет', value: false },
  { key: 'true', headline: 'Да', value: true },
];

export function BooleanCell({
  table,
  column,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<object>>) {
  const rowValue = row.getValue<boolean | null>(column.id);
  const foundValue = foundValueFunc(options, rowValue);

  const [innerValue, setInnerValue] = useState(foundValue);
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setInnerValue(foundValueFunc(options, rowValue));
  }, []);

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
        if (item === null) return;

        setInnerValue(item);
        setOpen(undefined);

        if (item) {
          meta?.valueChanged({
            ...row.original,
            [column.id]: item.value,
          });
        }
      }}
      shape="brick"
      size="small"
      showAllOptions
      style={{ height: '100%' }}
    />
  ) : (
    <div tabIndex={cellIndex}>{innerValue?.headline}</div>
  );
}

function foundValueFunc(
  options: BoolSelectProps[],
  rowValue: boolean | null,
): BoolSelectProps {
  const defaultValue = { key: 'false', headline: 'Нет', value: false };

  return (
    options.find((option) => {
      if (rowValue === null || rowValue === undefined) {
        return defaultValue;
      }

      return option.key === rowValue.toString();
    }) ?? defaultValue
  );
}
