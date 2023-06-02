import {BasePoint, BaseSeriesComponent, BaseSeriesConfig} from "tetacom/react-components";
import React, {useContext} from "react";
import {ChartContext} from "../../context/chart.context";

function BarSeries(props: BaseSeriesConfig<BasePoint>): React.ReactElement<BaseSeriesComponent<BasePoint>> {
    const config = useContext(ChartContext);
    return <>{props.series.data.map((point) => {
        return <></>
    })}</>
}

export {BarSeries}