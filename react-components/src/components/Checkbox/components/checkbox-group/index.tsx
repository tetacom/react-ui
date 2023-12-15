import React, { FC, useMemo, useState } from 'react';

import { Stack } from '../../../Stack';
import { Divider } from '../../../Divider';
import { CheckboxComponent } from '../checkbox';

import { CheckboxGroupProps } from '../../model';
import { CheckboxGroupItem } from '@tetacom/react-components';

interface CheckboxGroupType extends CheckboxGroupItem {
  checked: boolean;
}

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
    return options.map(({ id, name }) => ({
      id,
      name,
      checked: values.map((item) => item.id).includes(id),
    }));
  }, [options, value]);

  const [state, setState] = useState(checkboxList);
  const list = isControlled ? checkboxList : state;

  const handleChange = ({ id, name, checked }: CheckboxGroupType) => {
    const currentIndex = list.findIndex((item) => item.id === id);
    const result = [
      ...list.slice(0, currentIndex),
      { id, name, checked },
      ...list.slice(currentIndex + 1),
    ];

    onChange &&
      onChange(
        result
          .filter((item) => item.checked)
          .map((item) => ({ id: item.id, name: item.name })),
      );
    setState(result);
  };

  const handleClickAll = () => {
    const isAllItemsChecked = list.every((item) => item.checked);
    const result = options.map(({ id, name }) => ({
      id,
      name,
      checked: !isAllItemsChecked,
    }));

    onChange &&
      onChange(
        result
          .filter((item) => item.checked)
          .map((item) => ({ id: item.id, name: item.name })),
      );
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
        {list.map((item) => {
          return (
            <div key={item.id}>
              <CheckboxComponent
                checked={item.checked}
                onChange={(event) => {
                  handleChange({
                    id: item.id,
                    name: item.name,
                    checked: event.target.checked,
                  });
                }}
                name={name}
                disabled={disabled}
              >
                {item.name}
              </CheckboxComponent>
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
};
