import React, { FC, useMemo } from 'react';
import { Icon, Input } from '@tetacom/react-components';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const StringFilter: FC<Props> = ({ placeholder, value, onChange }) => {
  const handleClear = () => {
    onChange('');
  };

  const rightIcons = useMemo(
    () =>
      value.length
        ? [<Icon key="clear" name="closeBig" onClick={handleClear} />]
        : [],
    [value],
  );

  return (
    <Input.Text
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rightIcons={rightIcons}
      style={{ width: '100%' }}
    />
  );
};
