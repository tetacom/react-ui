import React, { FC, ReactElement, ReactNode, useState } from 'react';
import {
  autoUpdate,
  FloatingPortal,
  offset as offsetFn,
  shift,
  useClick,
  useDismiss,
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
  open,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const showTooltip = open !== undefined ? open : isOpen;
  const { x, y, refs, floatingStyles, context } = useFloating({
    open: showTooltip,
    placement,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offsetFn(offset), shift()],
  });

  const hover = useHover(context, { enabled: false });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      {React.cloneElement(children as ReactElement, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}

      {
        <AnimatePresence>
          {showTooltip && (
            <FloatingPortal>
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
            </FloatingPortal>
          )}
        </AnimatePresence>
      }
    </>
  );
};
