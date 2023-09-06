import React, { useEffect, useState } from 'react';
import { BaseSelectProps, Select } from 'tetacom/react-components';
import { ICellComponent } from '../../../model/i-cell-component';

export function SelectCell({
  table,
  column,
  dict,
  cellIndex,
  isEdit,
  row,
}: React.PropsWithoutRef<ICellComponent<number>>) {
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
  const value = options.find((option) => option.key === rawValue.toString());
  const [innerValue, setInnerValue] = useState(value);
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setOpen(isEdit);
  }, [isEdit]);

  const { meta } = table.options;

  return (
    <>
      {isEdit ? (
        <Select
          items={options}
          open={open}
          autoFocus={true}
          value={innerValue}
          tabIndex={cellIndex}
          onChangeItem={(item) => {
            meta?.valueChanged(item?.key);
            setInnerValue(item);
            setOpen(undefined); // Отдаем управление открытия/закрытия внутрь компонента Select
          }}
          shape="brick"
          size="small"
        />
      ) : (
        <div tabIndex={cellIndex}>{innerValue?.headline}</div>
      )}
    </>
  );
}
