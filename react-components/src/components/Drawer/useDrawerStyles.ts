import React from 'react';
import { DrawerProps, PlacementType } from './model';

const DRAWER_BORDER = 'var(--spacing-4) solid var(--color-primary-50)';

export const drawerStyles: Record<
  PlacementType,
  Pick<React.CSSProperties, 'left' | 'right' | 'top' | 'bottom'>
> = {
  left: {
    left: 0,
    right: 'auto',
    top: 0,
    bottom: 'auto',
  },
  right: {
    left: 'auto',
    right: 0,
    top: 0,
    bottom: 'auto',
  },
  top: {
    left: 0,
    right: 'auto',
    top: 0,
    bottom: 'auto',
  },
  bottom: {
    left: 0,
    right: 'auto',
    top: 'auto',
    bottom: 0,
  },
};

export const drawerBorderStyles: Record<
  PlacementType,
  Pick<
    React.CSSProperties,
    'borderTop' | 'borderBottom' | 'borderLeft' | 'borderRight'
  >
> = {
  left: {
    borderRight: DRAWER_BORDER,
  },
  right: {
    borderLeft: DRAWER_BORDER,
  },
  top: {
    borderBottom: DRAWER_BORDER,
  },
  bottom: {
    borderTop: DRAWER_BORDER,
  },
};

type Config = Pick<DrawerProps, 'placement' | 'width' | 'height'>;

export const useDrawerStyles = ({
  placement = 'right',
  width,
  height,
}: Config) => {
  const drawerPlacementStyles = drawerStyles[placement];
  const borderStylesOut =
    (placement === 'top' || placement === 'bottom') &&
    drawerBorderStyles[placement];
  const borderStylesIn =
    (placement === 'left' || placement === 'right') &&
    drawerBorderStyles[placement];
  const drawerWidth =
    placement === 'left' || placement === 'right' ? width : '100%';
  const drawerHeight =
    placement === 'top' || placement === 'bottom' ? height : '100%';
  const drawerOverflowStyles: React.CSSProperties =
    placement === 'top' || placement === 'bottom'
      ? {
          overflowX: 'hidden',
          overflowY: 'scroll',
        }
      : {};

  return {
    wrapperStyles: {
      ...drawerPlacementStyles,
      ...borderStylesOut,
      width: drawerWidth,
      height: drawerHeight,
      ...drawerOverflowStyles,
    },
    contentStyles: borderStylesIn,
  };
};
