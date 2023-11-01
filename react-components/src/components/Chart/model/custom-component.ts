import { MemoExoticComponent } from 'react';
import { BasePoint } from './base-point';
import { Series } from './series';
import { Axis } from '../useScales';

type ComponentProps<T extends BasePoint> = {
  x: Axis;
  y: Axis;
  serie: Series<T>;
};

type CustomComponent<T extends BasePoint> =
  | React.FunctionComponent<ComponentProps<T>>
  | React.FC<ComponentProps<T>>
  | MemoExoticComponent<React.FC<ComponentProps<T>>>;

export type { CustomComponent, ComponentProps };
