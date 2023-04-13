import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

import { Spinner } from '../Spinner';

import s from './style.module.scss';

type PaletteType = 'green' | 'yellow' | 'red';
type ViewType = 'primary' | 'outline' | 'ghost';
type SizeType = 'small' | 'middle' | 'large';
type ShapeType = 'brick' | 'round' | 'circle';

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

// TODO view outline желательно переименовать в secondary или в макетах secondary в outline
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  view?: ViewType;
  size?: SizeType;
  palette?: PaletteType;
  shape?: ShapeType;
  square?: boolean;
  block?: boolean;
  loading?: boolean;
}
type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      children,
      type,
      disabled,
      palette,
      shape = 'round',
      size = 'middle',
      view = 'primary',
      square = false,
      block = false,
      loading = false,
      className,
      ...props
    },
    ref,
  ) => {
    const utilityClasses = `button_${view} button-${palette || 'primary'}`;

    return (
      <button
        {...props}
        ref={ref}
        type={type || 'button'}
        disabled={loading || disabled}
        className={classNames(
          utilityClasses,
          s.button,
          sizeClasses[size],
          shapeClasses[shape],
          square && s.buttonSquare,
          block && s.buttonBlock,
          loading && s.buttonLoading,
          disabled && disabledClasses[view],
          className,
        )}
      >
        <span className={s.children}>{children}</span>
        {/*TODO в макете не нашел состояние лоадинг, нужно доавить*/}
        <span className={s.loading}>
          <Spinner />
        </span>
      </button>
    );
  },
);
