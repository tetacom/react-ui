import React, {useContext, useRef} from 'react';
import {defaultSeriesTypeMapping} from "../../lib/base-series-mapping";
import {LineSeries} from "../Series/LineSeries";
import {ChartContext} from "../../context/chart.context";


function ChartContainer(props: {scales: any[]}) {
    const config = useContext(ChartContext);


    return <svg width="100%" height="100%">
        {
            config?.series?.map((serie, index) => {
                const component = serie.component ? serie.component : defaultSeriesTypeMapping.get(serie.type) || LineSeries
                return React.createElement(component as never, {
                    config: config,
                    series: serie,
                    x: props.scales[0][index],
                    y: props.scales[1][index]
                })
            })
        }
    </svg>
}

export default ChartContainer;
