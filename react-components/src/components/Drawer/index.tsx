import React, { FC } from 'react';
import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  useId,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from '@floating-ui/react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { DrawerProps } from './model';
import { Button } from '../Button';
import { Icon } from '../Icons';
import { Typography } from '../Typography';
import { useDrawerStyles } from './useDrawerStyles';

import s from './style.module.scss';

export const Drawer: FC<DrawerProps> = ({
  open,
  onClose,
  closeIconName,
  title = '',
  placement = 'right',
  extra = [],
  width,
  height,
  zIndex,
  style,
  className,
  children,
}) => {
  const { refs, context } = useFloating({
    open: open,
    onOpenChange: onClose,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  const { drawerWrapperStyles, drawerStyles, drawerAnimateStyles } =
    useDrawerStyles({
      placement,
      width,
      height,
    });

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <FloatingOverlay lockScroll style={{ zIndex }}>
            <div className={s.drawer} style={drawerWrapperStyles}>
              <motion.div
                className={s.drawerBg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />

              <FloatingFocusManager context={context}>
                <motion.div
                  ref={refs.setFloating}
                  className={classNames(s.drawerContent, className)}
                  aria-labelledby={headingId}
                  aria-describedby={descriptionId}
                  {...getFloatingProps()}
                  style={{ ...drawerStyles, ...style }}
                  initial={drawerAnimateStyles}
                  animate={{ x: 0, y: 0 }}
                  exit={drawerAnimateStyles}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <div className={s.header}>
                    {title && (
                      <>
                        <Typography.Title
                          level={3}
                          fontVariant="title1"
                          resetMargin
                          id={headingId}
                        >
                          {title}
                        </Typography.Title>
                        <Button
                          shape="circle"
                          square
                          view="ghost"
                          onClick={onClose}
                        >
                          <Icon name={closeIconName || 'closeBig'} />
                        </Button>
                      </>
                    )}
                  </div>

                  <div className={s.body}>{children}</div>

                  <div className={s.footer}>{extra.length > 0 && extra}</div>
                </motion.div>
              </FloatingFocusManager>
            </div>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
};
