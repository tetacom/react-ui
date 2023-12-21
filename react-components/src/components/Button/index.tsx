import React, { ChangeEvent, Children, forwardRef, useRef, useId } from 'react';
import classNames from 'classnames';

import { Loader } from './components/Loader';
import { ButtonProps, ButtonRef } from './model';
import {
  disabledClasses,
  paletteClasses,
  shapeClasses,
  sizeClasses,
  viewClasses,
} from './class-names';

import s from './style.module.scss';

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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const classes = classNames(
      s.button,
      sizeClasses[size],
      shapeClasses[shape],
      viewClasses[view],
      paletteClasses[palette],
      square && s.buttonSquare,
      block && s.buttonBlock,
      loading && s.buttonLoading,
      file && s.buttonFile,
      disabled && disabledClasses[view],
      className,
    );

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const uploadFile = event.target.files[0];
        const { name } = uploadFile;
        const uploadFileType = name.slice(name.lastIndexOf('.') + 1);

        if (
          !file?.acceptList ||
          !file?.acceptList?.length ||
          file?.acceptList.includes(uploadFileType)
        ) {
          await file?.onChange(uploadFile);
        } else {
          const errorMessage =
            'Загруженный файл не соответствует ни одному из разрешенных типов';
          console.warn(errorMessage);
          file?.errorCallback && file?.errorCallback(errorMessage);
        }
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const buttonContent = Children.map(children, (child, index) => {
      if (square && index > 0) return null;
      return <span className={s.child}>{child}</span>;
    });
    const inputId = useId();
    const isDisabledButton = loading || disabled;

    if (file) {
      return (
        <label
          htmlFor={inputId}
          className={classes}
          style={{ cursor: 'pointer' }}
        >
          {buttonContent}
          <Loader loading={loading} />
          <input
            ref={fileInputRef}
            type="file"
            id={inputId}
            disabled={isDisabledButton}
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
        disabled={isDisabledButton}
        className={classes}
      >
        {buttonContent}
        <Loader loading={loading} />
      </button>
    );
  },
);
