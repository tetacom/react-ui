import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

import { Spinner } from '../Spinner';

import s from './style.module.scss';

type PaletteType = 'green' | 'yellow' | 'red';
type ViewType = 'primary' | 'outline' | 'ghost';
type SizeType = 'small' | 'middle' | 'large';
type BrickType = 'brick' | 'round' | 'circle';

const sizeClasses: Record<SizeType, string> = {
  small: s.rootSizeSmall,
  middle: s.rootSizeMiddle,
  large: s.rootSizeLarge,
};
const brickClasses: Record<BrickType, string> = {
  brick: s.rootBrickBrick,
  round: s.rootBrickRound,
  circle: s.rootBrickCircle,
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
  icons?: [React.ReactElement | null, React.ReactElement?];
  palette?: PaletteType;
  brick?: BrickType;
  square?: boolean;
  block?: boolean;
  loading?: boolean;
}
export type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      children,
      type,
      disabled,
      palette,
      brick = 'round',
      icons = [],
      size = 'middle',
      view = 'primary',
      square = false,
      block = false,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const utilityClasses = `button_${view} button-${palette || 'primary'}`;
    const [leftIcon, rightIcon] = icons;

    return (
      <button
        {...props}
        ref={ref}
        type={type || 'button'}
        disabled={loading || disabled}
        className={classNames(
          utilityClasses,
          s.root,
          sizeClasses[size],
          brickClasses[brick],
          square && s.rootSquare,
          block && s.rootBlock,
          loading && s.rootLoading,
          disabled && disabledClasses[view],
        )}
      >
        {leftIcon && <span className={s.leftIcon}>{leftIcon}</span>}
        <span className={s.children}>{children}</span>
        {rightIcon && <span className={s.rightIcon}>{rightIcon}</span>}

        {/*TODO в макете не нашел состояние лоадинг, нужно доавить*/}
        <span className={s.loading}>
          <Spinner />
        </span>
      </button>
    );
  },
);
