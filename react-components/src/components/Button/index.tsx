import React, { ChangeEvent, forwardRef, useId } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { Loader } from './Loader';
import { ButtonProps, ButtonRef, ShapeType, SizeType, ViewType } from './model';
import s from './style.module.scss';

const sizeClasses: Record<SizeType, string> = {
  small: s.buttonSizeSmall,
  middle: s.buttonSizeMiddle,
  large: s.buttonSizeLarge,
};
const shapeClasses: Record<ShapeType, string> = {
  brick: s.buttonShapeBrick,
  round: s.buttonShapeRound,
  circle: s.buttonShapeCircle,
};
const disabledClasses: Record<ViewType, string> = {
  primary: s.disabledPrimary,
  outline: s.disabledOutline,
  ghost: s.disabledGhost,
};

export const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      children,
      type,
      palette = 'none',
      shape = 'round',
      size = 'middle',
      view = 'primary',
      square = false,
      block = false,
      loading = false,
      disabled = false,
      file = null,
      className = '',
      ...props
    },
    ref,
  ) => {
    const utilityClasses = `button_${view} button-${
      palette === 'none' ? 'primary' : palette
    }`;
    const classes = classNames(
      utilityClasses,
      s.button,
      sizeClasses[size],
      shapeClasses[shape],
      square && s.buttonSquare,
      block && s.buttonBlock,
      loading && s.buttonLoading,
      file && s.buttonFile,
      disabled && disabledClasses[view],
      className,
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const uploadFile = event.target.files[0];
        const { name } = uploadFile;
        const uploadFileType = name.slice(name.lastIndexOf('.') + 1);

        if (
          !file?.acceptList ||
          !file?.acceptList?.length ||
          file?.acceptList.includes(uploadFileType)
        ) {
          file?.onChange(uploadFile);
        } else {
          console.warn(
            'Загруженный файл не соответствует ни одному из разрешенных типов',
          );
          file?.errorCallback && file?.errorCallback();
        }
      }
    };

    const inputId = useId();

    if (file) {
      return (
        <label
          htmlFor={inputId}
          className={classes}
          style={{ cursor: 'pointer' }}
        >
          {children}
          <input
            type="file"
            id={inputId}
            disabled={loading || disabled}
            onChange={handleChange}
          />
        </label>
      );
    }

    return (
      <button
        {...props}
        ref={ref}
        type={type || 'button'}
        disabled={loading || disabled}
        className={classes}
      >
        <span className={s.children}>{children}</span>

        <AnimatePresence initial={false}>
          {loading && (
            <motion.span
              className={s.loading}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Loader />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  },
);
