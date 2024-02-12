import React, { FC, useState } from 'react';
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

import { Spinner } from '../Spinner';
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
  title = null,
  placement = 'right',
  extra = [],
  width,
  height,
  zIndex,
  duration = 0.3,
  parent,
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

  const [isAnimationEnded, setAnimationEnded] = useState<boolean>(false);

  const { id, root } = {
    id: typeof parent === 'string' ? parent : undefined,
    root: typeof parent !== 'string' ? parent : undefined,
  };

  const titleElement =
    typeof title === 'string' ? (
      <Typography.Title level={3} fontVariant="title1" resetMargin>
        {title}
      </Typography.Title>
    ) : (
      <div>{title}</div>
    );

  return (
    <FloatingPortal id={id} root={root}>
      <AnimatePresence>
        {open && (
          <FloatingOverlay
            style={{ zIndex, position: id || root ? 'absolute' : 'fixed' }}
          >
            <div className={s.drawer} style={drawerWrapperStyles}>
              <motion.div
                className={s.drawerBg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration, ease: 'easeInOut' }}
                onAnimationComplete={(event) => {
                  setAnimationEnded(
                    Boolean((event as { opacity: 0 | 1 }).opacity),
                  );
                }}
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
                  transition={{ duration, ease: 'easeInOut' }}
                >
                  {isAnimationEnded ? (
                    <>
                      <div className={s.header} id={headingId}>
                        {title && (
                          <>
                            {titleElement}
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

                      <div className={s.footer}>
                        {extra.length > 0 && extra}
                      </div>
                    </>
                  ) : (
                    <Spinner size={24} color="var(--color-primary-50)" />
                  )}
                </motion.div>
              </FloatingFocusManager>
            </div>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
};
