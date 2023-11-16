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

  const { wrapperStyles, contentStyles } = useDrawerStyles({
    placement,
    width,
    height,
  });

  return (
    <FloatingPortal>
      {open && (
        <FloatingOverlay
          lockScroll
          className={s.drawerBg}
          style={{ ...style, zIndex }}
        >
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              className={classNames(s.drawerContent, className)}
              aria-labelledby={headingId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}
              style={wrapperStyles}
            >
              <div className={s.header} style={{ ...contentStyles }}>
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

              <div className={s.body} style={{ ...contentStyles }}>
                {children}
              </div>

              <div className={s.footer} style={{ ...contentStyles }}>
                {extra.length > 0 && extra}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
};
