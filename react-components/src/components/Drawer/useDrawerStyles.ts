import React from 'react';
import { DrawerProps, PlacementType } from './model';

const DRAWER_BORDER = 'var(--spacing-4) solid var(--color-primary-50)';

export const drawerWrapperStyles: Record<
  PlacementType,
  Pick<React.CSSProperties, 'flexDirection'>
> = {
  left: {
    flexDirection: 'row',
  },
  right: {
    flexDirection: 'row-reverse',
  },
  top: {
    flexDirection: 'column',
  },
  bottom: {
    flexDirection: 'column-reverse',
  },
};

export const drawerAnimateStyles: Record<
  PlacementType,
  { x: string | number; y: string | number }
> = {
  left: {
    x: '-100%',
    y: 0,
  },
  right: {
    x: '100%',
    y: 0,
  },
  top: {
    x: 0,
    y: '-100%',
  },
  bottom: {
    x: 0,
    y: '100%',
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
  const borderStyles = drawerBorderStyles[placement];
  const drawerWidth =
    placement === 'left' || placement === 'right' ? width : '100%';
  const drawerHeight =
    placement === 'top' || placement === 'bottom' ? height : '100%';

  return {
    drawerWrapperStyles: drawerWrapperStyles[placement],
    drawerStyles: {
      ...borderStyles,
      width: drawerWidth,
      height: drawerHeight,
    },
    drawerAnimateStyles: drawerAnimateStyles[placement],
  };
};
