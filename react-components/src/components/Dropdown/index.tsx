import React, { FC, useEffect, useState } from 'react';

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
  shift,
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

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: showDropdown,
    transform: false,
    onOpenChange: (e) => {
      setOpen(e);
      if (onOpenChange) {
        onOpenChange(e);
      }
    },
    whileElementsMounted: (reference, floating, update) => {
      return autoUpdate(reference, floating, update, {
        ancestorScroll: resizable,
      });
    },
    middleware: [
      autoPlacement({
        allowedPlacements: possiblePlacements,
      }),
      size({
        apply({ rects, elements, availableHeight }) {
          const height = maxHeight === 0 ? availableHeight : maxHeight;

          // Force update
          flushSync(() => {
            setMaxHeight(height);
          });

          Object.assign(elements.floating.style, {
            maxWidth: autoWidth ? `${rects.reference.width}px` : 'auto',
            maxHeight: `${availableHeight}px`,
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
      {React.cloneElement(children as React.ReactElement, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
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
