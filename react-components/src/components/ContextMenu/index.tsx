import {
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ContextMenuProps } from './model';

import s from './style.module.scss';

export function ContextMenu(props: React.PropsWithChildren<ContextMenuProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const show = props.open !== undefined ? props.open : isOpen;

  const { refs, floatingStyles, context } = useFloating({
    open: show,
    onOpenChange: props.openChange ? props.openChange : setIsOpen,
    transform: false,
    middleware: [
      offset({ mainAxis: 6, alignmentAxis: 6 }),
      flip({
        fallbackPlacements: ['left-start'],
      }),
      shift({ padding: 10 }),
    ],
    placement: 'right-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
  });
  const dismiss = useDismiss(context);

  const { getFloatingProps, getItemProps } = useInteractions([dismiss]);

  useEffect(() => {
    function onContextMenu(e: Event) {
      e.preventDefault();

      if (e instanceof MouseEvent) {
        refs.setPositionReference({
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: e.clientX,
              y: e.clientY,
              top: e.clientY,
              right: e.clientX,
              bottom: e.clientY,
              left: e.clientX,
            };
          },
        });

        setIsOpen(true);
      }
    }

    const node = props.nodeRef ? props.nodeRef.current : document;

    node?.addEventListener('contextmenu', onContextMenu);
    return () => {
      node?.removeEventListener('contextmenu', onContextMenu);
    };
  });

  return (
    <FloatingPortal>
      <AnimatePresence>
        {show && (
          <FloatingOverlay lockScroll>
            <motion.div
              className={s.contextContent}
              ref={refs.setFloating}
              style={floatingStyles}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              {...getFloatingProps()}
            >
              {Children.map(
                props.children,
                (child) =>
                  isValidElement(child) &&
                  cloneElement(
                    child,
                    getItemProps({
                      onClick() {
                        child.props.onClick?.();
                        setIsOpen(false);
                        props.openChange?.(false);
                      },
                      onMouseUp() {
                        child.props.onClick?.();
                        setIsOpen(false);
                        props.openChange?.(false);
                      },
                    }),
                  ),
              )}
            </motion.div>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}
