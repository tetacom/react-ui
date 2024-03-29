import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { RadioProps } from './model';
import { RadioGroup } from './group';
import RadioGroupContext from './context';
import s from './style.module.scss';

const spring = {
  type: 'spring',
  stiffness: 600,
  damping: 30,
};

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
      onChange(event);
    }
  };

  return (
    <label className={classNames(s.radio, disabled && s.disabled, className)}>
      <input
        {...props}
        type="radio"
        value={value}
        disabled={disabled}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className={classNames(s.input)}>
        <AnimatePresence initial={false}>
          {isChecked && (
            <motion.span
              className={s.checked}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={spring}
            />
          )}
        </AnimatePresence>
      </span>

      {children && <span>{children}</span>}
    </label>
  );
};

Radio.Group = RadioGroup;

export { Radio };
