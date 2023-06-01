import React from 'react';
import {defaultSeriesTypeMapping} from "../../lib/base-series-mapping";
import {LineSeries} from "../Series/LineSeries";
import {useConfig} from "../../context/hooks";


function ChartContainer() {
    const config = useConfig();
    return <svg width="100%" height="100%">
        {
            config?.series?.map((serie) => {
                const component = serie.component ? serie.component : defaultSeriesTypeMapping.get(serie.type) || LineSeries
                return React.createElement(component as never, {
                    config: config,
                    series: serie
                })
            })
        }
    </svg>
}

export default ChartContainer;
