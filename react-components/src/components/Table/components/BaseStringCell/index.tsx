import React from 'react';

import { Input } from '../../../Input';
import { TextareaProps } from '../../../Input/model';

export function EditStringCell({
  value,
  tabIndex,
  onBlur,
  onChange,
}: Pick<TextareaProps, 'value' | 'tabIndex' | 'onBlur' | 'onChange'>) {
  return (
    <Input.Textarea
      value={value}
      tabIndex={tabIndex}
      onBlur={onBlur}
      onChange={onChange}
      autoFocus
      shape="brick"
      size="small"
      height="100%"
    />
  );
}
