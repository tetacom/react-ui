import React, { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

import { Spinner } from '../Spinner';

import './style.scss';

// TODO view outline желательно переименовать в secondary или в макетах secondary в outline
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'middle' | 'large';
  view?: 'primary' | 'outline' | 'ghost';
  palette?: 'green' | 'yellow' | 'red';
  square?: boolean;
  block?: boolean;
  loading?: boolean;
}

export const Button: FC<Props> = ({
  children,
  type,
  palette,
  size = 'middle',
  view = 'primary',
  square = false,
  block = false,
  loading = false,
  ...props
}) => {
  const styles = `button_${view} button-${palette || 'primary'}`;

  return (
    <button
      {...props}
      type={type || 'button'}
      className={classNames(
        'Button',
        styles,
        `Button--size-${size}`,
        square && 'Button--square',
        block && 'Button--block',
        loading && 'Button--loading',
      )}
    >
      <span className="Button__children">{children}</span>

      {loading && (
        <span className="Button__loading">
          <Spinner />
        </span>
      )}
    </button>
  );
};
