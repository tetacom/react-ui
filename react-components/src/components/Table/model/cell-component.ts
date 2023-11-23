import React, {
  ForwardRefExoticComponent,
  MemoExoticComponent,
  RefAttributes,
} from 'react';
import { ICellComponent } from './i-cell-component';

export type CustomCellComponent =
  | React.FunctionComponent<ICellComponent<any>>
  | React.FC<ICellComponent<any>>
  | MemoExoticComponent<React.FC<ICellComponent<any>>>
  | ForwardRefExoticComponent<any & RefAttributes<HTMLElement>>;
