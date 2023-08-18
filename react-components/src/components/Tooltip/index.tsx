import React, { FC, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset as offsetFn,
  shift,
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

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
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
                style={{ ...floatingStyles, zIndex: 100 }}
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
