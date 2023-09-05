import React, { FC } from 'react';
import classNames from 'classnames';
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
import { motion, AnimatePresence } from 'framer-motion';

import { ModalProps } from './model';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import s from './style.module.scss';

export const Modal: FC<ModalProps> = ({
  open,
  onOk,
  okText = '',
  onCancel,
  cancelText = '',
  title = '',
  footer = true,
  width,
  style,
  className,
  children,
}) => {
  const { refs, context } = useFloating({
    open,
    onOpenChange: onCancel,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <FloatingOverlay className={s.modalOverlay} lockScroll>
              <FloatingFocusManager context={context}>
                <motion.div
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  exit={{ y: 50 }}
                  transition={{ type: 'spring', stiffness: 150 }}
                  ref={refs.setFloating}
                  aria-labelledby={headingId}
                  aria-describedby={descriptionId}
                  className={classNames(s.modal, className)}
                  style={{ ...style, width: width }}
                  {...getFloatingProps()}
                >
                  <Header title={title} onCancel={onCancel} />

                  <div className={s.modalBody}>{children}</div>

                  <Footer
                    footer={footer}
                    onOk={onOk}
                    okText={okText}
                    onCancel={onCancel}
                    cancelText={cancelText}
                  />
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          </motion.div>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
};
