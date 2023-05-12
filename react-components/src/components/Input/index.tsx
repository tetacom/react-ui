import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { InputProps, InputRef, ShapeType, SizeType } from './model';
import s from './style.module.scss';
import { Typography } from '../Typography';

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
      fieldSize = 'middle',
      shape = 'round',
      label = '',
      errorMessage = '',
      className,
      ...props
    },
    ref,
  ) => (
    <div className={s.input}>
      <label>
        {label && <span>{label}</span>}

        <input
          {...props}
          ref={ref}
          className={classNames(
            s.field,
            sizeClasses[fieldSize],
            shapeClasses[shape],
            className,
          )}
        />
      </label>

      {errorMessage && (
        <Typography.Text fontVariant="caption" className="color-red-50">
          {errorMessage}
        </Typography.Text>
      )}
    </div>
  ),
);
