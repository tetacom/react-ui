import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { ChipProps, ChipRef, ViewType } from './model';

import s from './style.module.scss';
import { Icon } from '../Icons';

const viewClasses: Record<ViewType, string> = {
  default: s.chipViewDefault,
  primary: s.chipViewPrimary,
  outline: s.chipViewOutline,
};

export const Chip = forwardRef<ChipRef, ChipProps>(
  (
    {
      children,
      view = 'default',
      closable = false,
      closeIcon = null,
      icon = null,
      picture = null,
      onClose = null,
      className,
      ...props
    },
    ref,
  ) => {
    const hasPictureOrIcon = picture || icon;

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
      onClose && onClose(event);
    };

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(s.chip, viewClasses[view], className)}
      >
        {hasPictureOrIcon &&
          (picture ? (
            <div className={s.picture}>{picture}</div>
          ) : (
            <div className={s.icon}>{icon}</div>
          ))}

        <span className={s.text}>{children}</span>

        {closable && (
          <div className={s.closeIcon} onClick={handleClose}>
            <Icon name="closeCircle" />
          </div>
        )}
      </div>
    );
  },
);
