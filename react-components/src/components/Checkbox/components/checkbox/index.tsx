import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { Typography } from '../../../Typography';
import { CheckboxProps, CheckboxRef } from '../../model';

import s from './style.module.scss';

export const CheckboxComponent = forwardRef<CheckboxRef, CheckboxProps>(
  (
    {
      children,
      disabled,
      defaultChecked,
      checked,
      indeterminate,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState<boolean>(
      defaultChecked || false,
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event);
      setIsChecked((prev) => !prev);
    };

    const checkboxState = checked === undefined ? isChecked : checked;

    return (
      <label
        className={classNames(
          s.checkbox,
          (checkboxState || indeterminate) && s.checkboxChecked,
          disabled && s.disabled,
          className,
        )}
      >
        <input
          {...props}
          ref={ref}
          type="checkbox"
          disabled={disabled}
          checked={checkboxState}
          onChange={handleChange}
        />
        <span
          className={classNames(
            s.input,
            (checkboxState || indeterminate) && s.inputChecked,
          )}
        >
          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
            <AnimatePresence initial={false}>
              {checkboxState && (
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

          <span
            className={classNames(
              s.indeterminate,
              indeterminate && !checkboxState && s.active,
            )}
          />
        </span>

        {typeof children === 'string' ? (
          <Typography.Text fontVariant="body3" className={s.textContent}>
            {children}
          </Typography.Text>
        ) : (
          children
        )}
      </label>
    );
  },
);
