import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { ChipProps, ChipRef, ViewType } from './model';
import { Icon } from '../Icons';
import { Avatar } from '../Avatar';

import s from './style.module.scss';

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
      picture = '',
      onClick = null,
      onClose = null,
      className,
      ...props
    },
    ref,
  ) => {
    const hasPictureOrIcon = picture || icon;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      onClick && onClick(event);
    };

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onClose && onClose(event);
    };

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          s.chip,
          viewClasses[view],
          onClick && s.chipClickable,
          className,
        )}
        onClick={handleClick}
      >
        {hasPictureOrIcon &&
          (picture ? (
            <div className={s.picture}>
              <Avatar name="" size="28" picture={picture} />
            </div>
          ) : (
            <div className={s.icon}>{icon}</div>
          ))}

        <span className={s.text}>{children}</span>

        {closable && (
          <div className={s.closeIcon} onClick={handleClose}>
            {closeIcon ? closeIcon : <Icon name="closeCircle" />}
          </div>
        )}
      </div>
    );
  },
);
