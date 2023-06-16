import React, { FC, useState } from 'react';

import {
  useFloating,
  size,
  autoPlacement,
  autoUpdate,
  useInteractions,
  useClick,
  useDismiss,
  FloatingPortal,
  flip,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { DropdownProps } from './model';
import s from './style.module.scss';
import { flushSync } from 'react-dom';

export const Dropdown: FC<DropdownProps> = ({
  dropdown,
  placement = 'bottom',
  possiblePlacements = ['left-end', 'right-end'],
  open,
  autoWidth = false,
  children,
  onOpenChange,
  resizable = false,
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const showDropdown = open !== undefined ? open : isOpen;

  const { x, y, refs, floatingStyles, context } = useFloating({
    placement,
    open: showDropdown,
    onOpenChange: (e) => {
      setOpen(e);
      if (onOpenChange) {
        onOpenChange(e);
      }
    },
    whileElementsMounted: resizable ? autoUpdate : undefined,
    middleware: [
      autoPlacement({
        allowedPlacements: possiblePlacements,
      }),
      flip(),
      size({
        apply({ rects, elements, availableHeight, x }) {
          // Force update
          flushSync(() => {
            setMaxHeight(maxHeight === 0 ? availableHeight : maxHeight);
          });
          Object.assign(elements.floating.style, {
            maxWidth: autoWidth ? `${rects.reference.width}px` : 'auto',
          });
        },
        padding: 12,
      }),
    ],
  });

  const click = useClick(context, { event: 'mousedown' });
  const dismiss = useDismiss(context, {
    escapeKey: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    click,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        className={s.dropdownTrigger}
        {...getReferenceProps()}
      >
        {children}
      </div>

      {
        <AnimatePresence>
          {showDropdown && (
            <FloatingPortal>
              <motion.div
                ref={refs.setFloating}
                {...getFloatingProps()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                style={{
                  ...floatingStyles,
                  maxHeight,
                  top: y ?? 0,
                  left: x ?? 0,
                }}
                className={s.dropdownContent}
              >
                <div
                  className={s.dropdownContentScrollable}
                  style={{
                    maxHeight,
                    overflowY: 'scroll',
                  }}
                >
                  {dropdown}
                </div>
              </motion.div>
            </FloatingPortal>
          )}
        </AnimatePresence>
      }
    </>
  );
};
