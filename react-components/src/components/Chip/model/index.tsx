import React, { HTMLAttributes } from 'react';

export type ChipRef = HTMLDivElement;

export type ViewType = 'default' | 'primary' | 'outline';

export interface ChipProps extends HTMLAttributes<ChipRef> {
  view: ViewType;
  closable?: boolean;
  closeIcon?: React.ReactElement;
  icon?: React.ReactElement;
  picture?: React.ReactElement;
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
}
