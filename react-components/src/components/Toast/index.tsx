import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import {
  useFloating,
  autoUpdate,
  flip,
  shift,
  useRole,
  useClick,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { Typography } from '../Typography';
import { Button } from '../Button';
import { Icon } from '../Icons';
import { ToastProps, ToastStateType } from './model';

import s from './style.module.scss';

const stateClasses: Record<ToastStateType, string> = {
  default: s.toastStateDefault,
  success: s.toastStateSuccess,
  warning: s.toastStateWarning,
  error: s.toastStateError,
};

const { Title } = Typography;

export const Toast: FC<ToastProps> = ({
  open,
  onClose,
  autoHideDuration = 1000,
  title,
  extra = [],
  state = 'default',

  children,
}) => {
  const handleClose = () => {
    onClose && onClose();
  };

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: () => {
      if (!open) {
        onClose && onClose();
      }
    },
    middleware: [flip({ fallbackAxisSideDirection: 'end' }), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose();
    }, autoHideDuration);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  const click = useClick(context);
  const role = useRole(context);
  const { getFloatingProps } = useInteractions([click, role]);

  return (
    <AnimatePresence>
      {open && (
        <FloatingPortal>
          <motion.div
            className={classNames(s.toast, stateClasses[state])}
            ref={refs.setFloating}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              ...floatingStyles,
              position: 'fixed',
              left: 'auto',
              top: 'auto',
              right: 0,
              bottom: 0,
              transform: 'none',
            }}
            {...getFloatingProps()}
          >
            <div className={s.head}>
              <Title level={4} fontVariant="title2" resetMargin>
                {title}
              </Title>

              <Button shape="round" square view="ghost" onClick={handleClose}>
                <Icon name="closeBig" />
              </Button>
            </div>

            <div className={s.content}>
              {children}

              {Boolean(extra?.length) && <div className={s.extra}>{extra}</div>}
            </div>
          </motion.div>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
};
