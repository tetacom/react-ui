import React from 'react';

import { Input } from '../../../Input';
import { InputProps } from '../../../Input/model';

export function EditStringCell({
  value,
  tabIndex,
  onBlur,
  onChange,
}: Pick<InputProps, 'value' | 'tabIndex' | 'onBlur' | 'onChange'>) {
  return (
    <Input
      value={value}
      tabIndex={tabIndex}
      onBlur={onBlur}
      onChange={onChange}
      autoFocus
      shape="brick"
      size="small"
    />
  );
}
