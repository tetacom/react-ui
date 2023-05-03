import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { Loader } from './Loader';
import { ButtonProps, ButtonRef, ShapeType, SizeType, ViewType } from './model';
import s from './style.module.scss';

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

export const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      children,
      type,
      disabled,
      palette = 'none',
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
    const utilityClasses = `button_${view} button-${
      palette === 'none' ? 'primary' : palette
    }`;

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
        <AnimatePresence initial={false}>
          {loading && (
            <motion.span
              className={s.loading}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Loader />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  },
);
