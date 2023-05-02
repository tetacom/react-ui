import { PropsWithChildren, ReactElement } from 'react';
import { Placement } from 'react-laag';

export interface DropdownProps extends PropsWithChildren {
  dropdown: ReactElement;
  placement?: Placement;
  autoPlacement?: boolean;
  open?: boolean;
}
