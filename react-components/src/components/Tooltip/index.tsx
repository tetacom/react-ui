import React, { FC, useState } from 'react';
import {
  offset as offsetFn,
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
  const { x, y, refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement,
    onOpenChange: setIsOpen,
    middleware: [offsetFn(offset)],
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </span>
      {
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={s.tooltip}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              ref={refs.setFloating}
              style={{ ...floatingStyles, top: y, left: x }}
              {...getFloatingProps()}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      }
    </>
  );
};
