import { AxisOptions } from './axis-options';
import { BasePoint } from './base-point';
import { Series } from './series';

export type ChartConfig = {
  name?: string;
  id?: string;
  series?: Series<BasePoint>[];
  noDataText?: 'No data';
  inverted?: boolean;
  xAxis: AxisOptions[];
  yAxis: AxisOptions[];
  width?: number;
  height?: number;
};
