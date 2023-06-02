import {Component, useRef, useState} from 'react';
import styles from './style.module.css';
import ChartContainer from "./components/ChartContainer";
import {IChartConfig} from "./model/chart-config";
import {ChartContext} from "./context/chart.context";
import {useSize} from "./lib/use-size";
import {useScales} from "./lib/use-scales";

/* eslint-disable-next-line */
export type ChartProps = {
    config: IChartConfig
}

function Chart(props: ChartProps) {
    const ref = useRef(null);
    const size = useSize(ref);
    const scales = useScales(props.config, size);

    return (
        <div ref={ref} style={{height: '100%', width: '100%'}}>
            <ChartContext.Provider value={props.config}>
                <ChartContainer scales={scales}></ChartContainer>
            </ChartContext.Provider>
        </div>

    );
}

export default Chart;
