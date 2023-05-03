import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { CheckboxProps, CheckboxRef } from './model';
import s from './style.module.scss';

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({ children, disabled, checked, onChange, className, ...props }, ref) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event);
      setIsChecked((prev) => !prev);
    };

    return (
      <label
        className={classNames(
          s.checkbox,
          isChecked && s.checkboxChecked,
          disabled && s.disabled,
          className,
        )}
      >
        <input
          {...props}
          ref={ref}
          type="checkbox"
          disabled={disabled}
          checked={isChecked}
          onChange={handleChange}
        />
        <span className={classNames(s.input, isChecked && s.inputChecked)}>
          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
            <AnimatePresence initial={false}>
              {isChecked && (
                <motion.path
                  d="M9 1L4 6L1 3"
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ pathLength: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.2,
                  }}
                />
              )}
            </AnimatePresence>
          </svg>
        </span>

        {children && <span>{children}</span>}
      </label>
    );
  },
);
