import React from 'react';

import { Input } from '../../../../Input';
import { InputProps } from '../../../../Input/model';

export function EditStringCell({
  value,
  tabIndex,
  onBlur,
  onChange,
  onKeyDown,
  onPressEnter,
  placeholder,
}: Pick<
  InputProps,
  | 'value'
  | 'tabIndex'
  | 'onBlur'
  | 'onChange'
  | 'onKeyDown'
  | 'onPressEnter'
  | 'placeholder'
>) {
  return (
    <Input
      value={value}
      tabIndex={tabIndex}
      onBlur={onBlur}
      onChange={onChange}
      onPressEnter={onPressEnter}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      autoFocus
      shape="brick"
      size="small"
    />
  );
}
