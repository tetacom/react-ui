import React, { MemoExoticComponent } from 'react';
import { ICellComponent } from './i-cell-component';

export type CustomCellComponent =
  | React.FunctionComponent<ICellComponent<any>>
  | React.FC<ICellComponent<any>>
  | MemoExoticComponent<React.FC<ICellComponent<any>>>;
