import {BasePoint} from './base-point';
import {SeriesType} from './enum/public-api';
import React, {Component} from "react";
import {IChartConfig} from "./chart-config";

export type Series<T extends BasePoint> = {
  id?: number | string;
  type: SeriesType;
  data: T[];
  name?: string;
  xAxisIndex?: number;
  yAxisIndex?: number;
  component?: ((props: BaseSeriesConfig<T>) => React.ReactElement<BaseSeriesComponent<T>>) | null;
  visible?: boolean;
  color?: string;
  showInLegend?: boolean;
}
export type BaseSeriesComponent<T extends BasePoint> = Component<BaseSeriesConfig<T>> | React.FC<BaseSeriesConfig<T>>;
export type BaseSeriesConfig<T extends BasePoint> = {
  config: IChartConfig;
  series: Series<T>
}

