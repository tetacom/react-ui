import {BasePoint, BaseSeriesComponent, BaseSeriesConfig} from "tetacom/react-components";
import React from "react";
import {useConfig} from "../../context/hooks";

function BarSeries(props: BaseSeriesConfig<BasePoint>): React.ReactElement<BaseSeriesComponent<BasePoint>> {
    const config = useConfig();
    return <>{props.series.data.map((point) => {
        return <></>
    })}</>
}

export {BarSeries}