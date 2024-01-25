import React, { useEffect, useState } from 'react';
import { BaseSelectProps } from '@tetacom/react-components';

import { Select } from '../../../../Select';
import { ICellComponent } from '../../../model/public-api';

const options: Array<BaseSelectProps> = [
  { key: 'false', headline: 'Нет' },
  { key: 'true', headline: 'Да' },
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
      style={{ height: '100%' }}
    />
  ) : (
    <div tabIndex={cellIndex}>{innerValue?.headline}</div>
  );
}

function foundValueFunc(
  options: BaseSelectProps[],
  rowValue: boolean | null,
): BaseSelectProps {
  return (
    options.find((option) => {
      if (rowValue === null || rowValue === undefined) {
        return;
      }

      return option.key === rowValue.toString();
    }) ?? { key: 'false', headline: 'Нет' }
  );
}
