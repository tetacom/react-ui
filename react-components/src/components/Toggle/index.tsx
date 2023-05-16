import React, { forwardRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import { ToggleProps, ToggleRef } from './model';
import { Spinner } from '../Spinner';

import s from './style.module.scss';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export const Toggle = forwardRef<ToggleRef, ToggleProps>(
  (
    {
      defaultChecked = false,
      checked = false,
      disabled = false,
      loading = false,
      autoFocus = false,
      className = '',
      onChange = null,
    },
    ref,
  ) => {
    const [isOn, setIsOn] = useState(defaultChecked);

    const toggleSwitch = () => {
      setIsOn(!isOn);

      onChange && onChange(!isOn);
    };

    const isChecked = isOn || checked;
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        className={classNames(
          s.toggle,
          isChecked && s.toggleChecked,
          disabled && s.disabled,
          className,
        )}
        onClick={toggleSwitch}
        autoFocus={autoFocus}
        disabled={isDisabled}
      >
        <motion.div className={s.handle} layout transition={spring}>
          <AnimatePresence initial={false}>
            {loading && (
              <motion.span
                className={s.loading}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Spinner size={6} color="currentColor" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </button>
    );
  },
);
