import {Series} from "./series";
import {BasePoint} from "./base-point";
import {AxisOptions} from "./axis-options";

export type IChartConfig = {
    name?: string;
    id?: string;
    series?: Series<BasePoint>[];
    noDataText?: 'No data',
    legend?: {
        enable?: boolean;
    };
    bounds?: never;
    inverted?: boolean;
    xAxis: AxisOptions[];
    yAxis: AxisOptions[];
    gridLines?: {
        enable?: boolean;
        showX?: boolean;
        showY?: boolean;
        x?: {
            ticksCount?: number
        },
        y?: {
            ticksCount?: number
        }
    };
    width?: number;
    height?: number;
}
