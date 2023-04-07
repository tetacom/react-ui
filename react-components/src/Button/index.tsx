import React, { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

import { Spinner } from '../Spinner';

import s from './style.module.scss';

type ViewType = 'primary' | 'outline' | 'ghost';
type SizeType = 'small' | 'middle' | 'large';

const sizeClasses: Record<SizeType, string> = {
  small: s.rootSizeSmall,
  middle: s.rootSizeMiddle,
  large: s.rootSizeLarge,
};
const disabledClasses: Record<ViewType, string> = {
  primary: s.disabledPrimary,
  outline: s.disabledOutline,
  ghost: s.disabledGhost,
};

// TODO view outline желательно переименовать в secondary или в макетах secondary в outline
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  view?: ViewType;
  size?: SizeType;
  palette?: 'green' | 'yellow' | 'red';
  square?: boolean;
  block?: boolean;
  loading?: boolean;
}

export const Button: FC<Props> = ({
  children,
  type,
  disabled,
  palette,
  size = 'middle',
  view = 'primary',
  square = false,
  block = false,
  loading = false,
  ...props
}) => {
  const utilityClasses = `button_${view} button-${palette || 'primary'}`;

  return (
    <div>
      <button
        {...props}
        type={type || 'button'}
        disabled={loading || disabled}
        className={classNames(
          utilityClasses,
          s.root,
          sizeClasses[size],
          square && s.rootSquare,
          block && s.rootBlock,
          loading && s.rootLoading,
          disabled && disabledClasses[view],
        )}
      >
        {loading && square ? null : children}
        {/*TODO в макете не нашел состояние лоадинг, нужно доавить*/}
        {loading && <Spinner />}
      </button>
    </div>
  );
};
