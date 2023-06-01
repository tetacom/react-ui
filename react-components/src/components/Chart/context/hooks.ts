import {useContext} from "react";
import {ChartContext} from "./chart.context";

export const useConfig = () => {
    return useContext(ChartContext);
}