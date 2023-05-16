import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { InputProps, InputRef, ShapeType, SizeType } from './model';
import { Typography } from '../Typography';

import s from './style.module.scss';

const sizeClasses: Record<SizeType, string> = {
  large: s.inputSizeLarge,
  middle: s.inputSizeMiddle,
  small: s.inputSizeSmall,
};
const shapeClasses: Record<ShapeType, string> = {
  brick: s.inputShapeBrick,
  round: s.inputShapeRound,
  circle: s.inputShapeCircle,
};

export const Input = forwardRef<InputRef, InputProps>(
  (
    {
      defaultValue = '',
      value = '',
      fieldSize = 'middle',
      shape = 'round',
      label = '',
      labelPosition = 'top',
      placeholder = '',
      errorMessage = '',
      allowClear = false,
      disabled = false,
      maxLength = 0,
      icon = null,
      onChange = null,
      onPressEnter = null,
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <div className={s.input}>
      <label
        className={classNames(
          s.content,
          labelPosition === 'left' && s.contentLeft,
        )}
        style={style}
      >
        {label && <span className={s.label}>{label}</span>}

        <span
          className={classNames(
            s.field,
            sizeClasses[fieldSize],
            shapeClasses[shape],
            className,
          )}
        >
          <input {...props} ref={ref} />
          <span className={s.placeholder}>{placeholder}</span>
        </span>
      </label>

      {errorMessage && (
        <Typography.Text fontVariant="caption" className="color-red-50">
          {errorMessage}
        </Typography.Text>
      )}
    </div>
  ),
);
