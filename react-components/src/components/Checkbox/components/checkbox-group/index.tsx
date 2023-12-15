import React, { FC, useMemo, useState } from 'react';

import { Stack } from '../../../Stack';
import { Divider } from '../../../Divider';
import { CheckboxComponent } from '../checkbox';

import { CheckboxGroupProps } from '../../model';

type CheckboxGroupType = {
  label: string;
  checked: boolean;
};

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  options,
  defaultValue = [],
  value = [],
  name,
  disabled,
  direction,
  onChange,
}) => {
  const isControlled = value.length !== 0;
  const values = isControlled ? value : defaultValue;
  const checkboxList: CheckboxGroupType[] = useMemo(() => {
    return options.map((option) => ({
      label: option,
      checked: values.includes(option),
    }));
  }, [options, value]);

  const [state, setState] = useState(checkboxList);
  const list = isControlled ? checkboxList : state;

  const handleChange = ({ label, checked }: CheckboxGroupType) => {
    const currentIndex = list.findIndex((item) => item.label === label);
    const result = [
      ...list.slice(0, currentIndex),
      { label, checked },
      ...list.slice(currentIndex + 1),
    ];

    onChange &&
      onChange(result.filter((item) => item.checked).map((item) => item.label));
    setState(result);
  };

  const handleClickAll = () => {
    const isAllItemsChecked = list.every((item) => item.checked);
    const result = options.map((label) => ({
      label,
      checked: !isAllItemsChecked,
    }));

    onChange &&
      onChange(result.filter((item) => item.checked).map((item) => item.label));
    setState(result);
  };

  const indeterminate = list.some((item) => item.checked);
  const allItemsChecked = list.every((item) => item.checked);

  return (
    <Stack
      align="start"
      size={12}
      direction="column"
      divider={<Divider type="horizontal" />}
    >
      <CheckboxComponent
        onClick={handleClickAll}
        checked={allItemsChecked}
        indeterminate={indeterminate}
      >
        Выбрать все
      </CheckboxComponent>

      <Stack size={20} direction={direction} align="start">
        {list.map(({ label, checked }, index) => (
          <div key={`${label}-${index}`}>
            <CheckboxComponent
              checked={checked}
              onChange={(event) => {
                handleChange({ label, checked: event.target.checked });
              }}
              name={name}
              disabled={disabled}
            >
              {label}
            </CheckboxComponent>
          </div>
        ))}
      </Stack>
    </Stack>
  );
};
