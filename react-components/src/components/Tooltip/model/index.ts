import { PropsWithChildren } from 'react';
import { Placement } from 'react-laag';

export interface TooltipProps extends PropsWithChildren {
  title: string;
  placement?: Placement;
  autoPlacement?: boolean;
  offset?: number;
}
