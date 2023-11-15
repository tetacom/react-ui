import React from 'react';

import { Input } from '../../../../Input';
import { TextareaProps } from '../../../../Input/model';

export function EditStringCell({
  value,
  tabIndex,
  onBlur,
  onChange,
  onKeyDown,
  onPressEnter,
  placeholder,
}: Pick<
  TextareaProps,
  | 'value'
  | 'tabIndex'
  | 'onBlur'
  | 'onChange'
  | 'onKeyDown'
  | 'onPressEnter'
  | 'placeholder'
>) {
  return (
    <Input.Textarea
      height="100%"
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
