import React, { forwardRef, useState, useRef } from 'react';
import classNames from 'classnames';

import { InputProps, InputRef, ShapeType, SizeType } from './model';
import { Typography } from '../Typography';
import { Icon } from '../Icons';

import s from './style.module.scss';

const sizeClasses: Record<SizeType, string> = {
  large: s.fieldSizeLarge,
  middle: s.fieldSizeMiddle,
  small: s.fieldSizeSmall,
};
const shapeClasses: Record<ShapeType, string> = {
  brick: s.fieldShapeBrick,
  round: s.fieldShapeRound,
  circle: s.fieldShapeCircle,
};

export const Input = forwardRef<InputRef, InputProps>(
  (
    {
      defaultValue = '',
      value,
      size = 'middle',
      shape = 'round',
      label = '',
      labelPosition = 'top',
      placeholder = 'Placeholder',
      errorMessage = '',
      disabled = false,
      maxLength = 0,
      leftIconName = '',
      rightIcon = null,
      onChange = null,
      onPressEnter = null,
      className,
      style,
      readonly = false,
      ...props
    },
    ref,
  ) => {
    const inputWrapperRef = useRef<HTMLSpanElement>(null);
    const [inputValue, setInputValue] = useState(defaultValue);

    const finalValue = value !== undefined ? value : inputValue;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const lengthDiff = maxLength - value.length;

      if (maxLength && lengthDiff < 0) {
        const prevValue = value.slice(0, -1);
        setInputValue(prevValue);
        onChange && onChange(prevValue);
      } else {
        setInputValue(value);
        if (onChange) {
          onChange(value);
        }
      }
    };

    const handleClickRightIcon = () => {
      rightIcon?.onClick && rightIcon.onClick();
      inputWrapperRef.current?.querySelector('input')?.focus();
    };

    const handleEnterKeyPress = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === 'Enter') {
        onPressEnter && onPressEnter(event);
      }
    };

    const isFieldFull = maxLength - finalValue.length <= 0;
    const isErrorStatus = errorMessage || (maxLength && isFieldFull);

    return (
      <div
        className={classNames(
          s.input,
          labelPosition === 'left' && s.inputHorizontal,
        )}
        style={style}
      >
        {label && (
          <label htmlFor={props.id} className={s.label}>
            {label}
          </label>
        )}

        <span
          ref={inputWrapperRef}
          className={classNames(
            s.field,
            sizeClasses[size],
            shapeClasses[shape],
            leftIconName && s.fieldLeftIcon,
            rightIcon && s.fieldRightIcon,
          )}
        >
          <input
            {...props}
            ref={ref}
            className={classNames(
              s.fieldTag,
              finalValue && s.fieldTagHasValue,
              isErrorStatus && s.fieldTagHasError,
              className,
            )}
            value={finalValue}
            onChange={handleChange}
            onKeyDown={handleEnterKeyPress}
            disabled={disabled}
            readOnly={readonly}
          />

          <span className={s.placeholder}>{placeholder}</span>

          {leftIconName && (
            <span className={s.icon}>
              <Icon name={leftIconName} size={16} />
            </span>
          )}

          {rightIcon && (
            <button
              type="button"
              className={s.rightIcon}
              disabled={disabled}
              onClick={handleClickRightIcon}
            >
              {typeof rightIcon.icon === 'string' && (
                <Icon name={rightIcon.icon} size={16} />
              )}
              {typeof rightIcon.icon !== 'string' && rightIcon.icon}
            </button>
          )}
        </span>

        <div className={s.footer}>
          <span>
            {errorMessage && (
              <Typography.Text fontVariant="caption" className={s.errorMessage}>
                {errorMessage}
              </Typography.Text>
            )}
          </span>

          {Boolean(maxLength) && (
            <Typography.Text
              fontVariant="caption"
              className={classNames(
                s.maxLength,
                isFieldFull ? s.maxLengthError : s.maxLengthSuccess,
              )}
            >
              {`${finalValue.length}/${maxLength}`}
            </Typography.Text>
          )}
        </div>
      </div>
    );
  },
);
