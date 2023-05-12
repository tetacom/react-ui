import React, { FC } from 'react';
import { useLayer } from 'react-laag';
import { motion, AnimatePresence } from 'framer-motion';

import { DropdownProps } from './model';
import s from './style.module.scss';

export const Dropdown: FC<DropdownProps> = ({
  dropdown,
  placement = 'bottom-center',
  autoPlacement = true,
  open = false,
  children,
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };
  const close = () => {
    setOpen(false);
  };

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close,
    possiblePlacements: ['left-end', 'right-end'],
    overflowContainer: false,
    auto: autoPlacement,
    placement,
  });

  const showDropdown = isOpen || open;

  return (
    <>
      <div className={s.dropdownTrigger} {...triggerProps} onClick={toggle}>
        {children}
      </div>

      {renderLayer(
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              {...layerProps}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className={s.dropdownContent}
            >
              {dropdown}
            </motion.div>
          )}
        </AnimatePresence>,
      )}
    </>
  );
};
