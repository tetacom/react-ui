import React, { FC, useState } from 'react';
import { flushSync } from 'react-dom';

import {
  useFloating,
  size,
  autoPlacement,
  autoUpdate as updateFn,
  useInteractions,
  useClick,
  useDismiss,
  FloatingPortal,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { DropdownProps } from './model';

import s from './style.module.scss';

const DropDownContent: FC<
  React.PropsWithChildren<Pick<DropdownProps, 'portal'>>
> = (props) => {
  return props.portal?.enable ? (
    <FloatingPortal id={props.portal.id} root={props.portal.rootNode}>
      {props.children}
    </FloatingPortal>
  ) : (
    props.children
  );
};

export const Dropdown: FC<DropdownProps> = ({
  dropdown,
  placement = 'bottom',
  possiblePlacements = ['left-end', 'right-end'],
  open,
  width,
  children,
  onOpenChange,
  zIndex,
  maxHeightContainer = 'availableHeight',
  portal = { enable: false },
  hideScroll = false,
  autoUpdate = {
    ancestorResize: true,
    ancestorScroll: true,
    elementResize: true,
    layoutShift: true,
  },
  padding = {
    left: 12,
    bottom: 12,
    right: 12,
    top: 12,
  },
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
      return updateFn(reference, floating, update, {
        ...autoUpdate,
        animationFrame: true,
      });
    },
    middleware: [
      autoPlacement({
        allowedPlacements: possiblePlacements,
      }),
      size({
        apply({ rects, elements, availableHeight }) {
          // Force update
          flushSync(() => {
            setMaxHeight((prev) => {
              return prev === 0 ? availableHeight : prev;
            });
          });

          let maxWidth = 'auto';
          if (width?.type === 'parent') {
            maxWidth = `${rects.reference.width}px`;
          } else if (width?.type === 'fixed') {
            maxWidth = width?.value ? `${width.value}px` : 'auto';
          }

          Object.assign(elements.floating.style, {
            maxWidth,
            width: maxWidth,
            maxHeight:
              maxHeightContainer === 'availableHeight'
                ? availableHeight
                : 'auto',
          });
        },
        padding,
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

  if (typeof children === 'string') {
    throw new Error('Dropdown trigger must be an React Element');
  }

  const TriggerElement = Array.isArray(children) ? (
    <div>{React.Children.map(children.filter(Boolean), (_) => _)}</div>
  ) : (
    children
  );

  return (
    <>
      {React.cloneElement(TriggerElement as React.ReactElement, {
        ref: refs.setReference,
        ...getReferenceProps(),
        className: s.dropdownTrigger,
      })}

      {
        <AnimatePresence>
          {showDropdown && (
            <DropDownContent portal={portal}>
              <motion.div
                ref={refs.setFloating}
                {...getFloatingProps()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                style={{
                  ...floatingStyles,
                  zIndex,
                }}
                className={s.dropdownContent}
              >
                <div
                  className={s.dropdownContainer}
                  style={{
                    maxHeight:
                      maxHeightContainer === 'availableHeight'
                        ? maxHeight
                        : 'auto',
                    overflowY: hideScroll ? 'hidden' : 'scroll',
                  }}
                >
                  {dropdown}
                </div>
              </motion.div>
            </DropDownContent>
          )}
        </AnimatePresence>
      }
    </>
  );
};
