import { MemoExoticComponent } from 'react';
import { BasePoint } from './base-point';
import { SeriesType } from './enum';
import { Axis } from '../useScales';
import { CustomComponent } from './custom-component';

export type Series<Data extends BasePoint> = {
  id?: number | string;
  type: SeriesType;
  data: Data[];
  name?: string;
  xAxisIndex?: number;
  yAxisIndex?: number;
  component?: CustomComponent<Data>;
  visible?: boolean;
  color?: string;
  showInLegend?: boolean;
};
