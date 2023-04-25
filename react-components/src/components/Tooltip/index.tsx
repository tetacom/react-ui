import React, { FC } from 'react';
import { useLayer, useHover, Arrow } from 'react-laag';
import { motion, AnimatePresence } from 'framer-motion';

import { TooltipProps } from './model';
import s from './style.module.scss';

export const Tooltip: FC<TooltipProps> = ({
  title,
  placement = 'top-center',
  autoPlacement = false,
  offset = 0,
  children,
}) => {
  const arrowSize = 8;
  const triggerOffset = arrowSize + offset;

  const [isOver, hoverProps] = useHover();

  const { triggerProps, layerProps, renderLayer, arrowProps } = useLayer({
    isOpen: isOver,
    placement,
    auto: autoPlacement,
    snap: true,
    triggerOffset: triggerOffset,
  });

  return (
    <>
      <span {...triggerProps} {...hoverProps}>
        {children}
      </span>

      {renderLayer(
        <AnimatePresence>
          {isOver && (
            <motion.div
              className={s.tooltip}
              {...layerProps}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {title}
              <Arrow
                angle={45}
                size={arrowSize}
                borderWidth={1}
                borderColor="var(--color-text-5)"
                backgroundColor="var(--color-global-bgcard)"
                {...arrowProps}
              />
            </motion.div>
          )}
        </AnimatePresence>,
      )}
    </>
  );
};
