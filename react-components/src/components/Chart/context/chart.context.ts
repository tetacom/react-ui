import {createContext, useContext} from "react";
import {IChartConfig} from "tetacom/react-components";

export const ChartContext = createContext<IChartConfig>({
    series: [],
    yAxis: [],
    xAxis: []
});

