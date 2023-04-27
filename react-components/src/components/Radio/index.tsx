import React, { FC, useContext } from 'react';
import classNames from 'classnames';

import { RadioProps } from './model';
import { RadioGroup } from './group';
import RadioGroupContext from './context';
import s from './style.module.scss';

interface RadioComposition {
  Group: typeof RadioGroup;
}

const Radio: FC<RadioProps> & RadioComposition = ({
  children,
  disabled,
  value,
  checked = false,
  onChange,
  className,
  ...props
}) => {
  const { value: contextValue, onChange: onChangeContextValue } =
    useContext(RadioGroupContext);
  const isChecked = (value && value === contextValue) || checked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (contextValue) {
      const { value: targetValue } = event.target;
      onChangeContextValue(parseInt(targetValue) || targetValue);
    }

    if (onChange) {
      onChange(event.target.checked, event);
    }
  };

  return (
    <label
      className={classNames(
        s.radio,
        isChecked && s.radioChecked,
        disabled && s.disabled,
        className,
      )}
    >
      <input
        {...props}
        type="radio"
        value={value}
        disabled={disabled}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className={classNames(s.input)} />

      {children && <span>{children}</span>}
    </label>
  );
};

Radio.Group = RadioGroup;

export { Radio };
