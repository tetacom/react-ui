import {createContext} from "react";
import {IChartConfig} from "tetacom/react-components";

export const ChartContext = createContext<IChartConfig & {[key: string]: any}>({
    series: [],
    yAxis: [],
    xAxis: [],
    yScales: [],
    xScales: [],
    size: DOMRect,
    transforms: [],
    setTransform: () => {},
    setSize: () => {}
});



