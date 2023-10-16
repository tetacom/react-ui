import React, { FC, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset as offsetFn,
  shift,
  useClientPoint,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { TooltipProps } from './model';

import s from './style.module.scss';

export const Tooltip: FC<TooltipProps> = ({
  title,
  placement = 'top',
  offset = 4,
  delay = 500,
  mouseFollow = false,
  maxWidth,
  zIndex = 100,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement,
    transform: false,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offsetFn(offset), flip(), shift()],
  });

  const clientPoint = useClientPoint(context, {
    enabled: mouseFollow,
  });
  const hover = useHover(context, {
    delay: {
      open: delay,
      close: 0,
    },
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clientPoint,
    hover,
  ]);

  if (!children) return null;

  const triggerElement: React.ReactElement = Array.isArray(children)
    ? children[0]
    : children;

  return (
    <>
      {React.cloneElement(triggerElement, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}

      {title && (
        <AnimatePresence>
          {isOpen && (
            <FloatingPortal>
              <motion.div
                className={s.tooltip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                ref={refs.setFloating}
                style={{ ...floatingStyles, maxWidth, zIndex }}
                {...getFloatingProps()}
              >
                {title}
              </motion.div>
            </FloatingPortal>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
