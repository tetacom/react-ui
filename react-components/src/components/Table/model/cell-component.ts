import React, { MemoExoticComponent } from 'react';
import { ICellComponent } from './i-cell-component';

export type CustomCellComponent =
  | React.FunctionComponent<ICellComponent>
  | React.FC<ICellComponent>
  | MemoExoticComponent<React.FC<ICellComponent>>;
