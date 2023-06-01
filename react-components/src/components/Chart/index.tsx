import {Component} from 'react';
import styles from './style.module.css';
import ChartContainer from "./components/ChartContainer";
import {IChartConfig} from "./model/chart-config";
import {ChartContext} from "./context/chart.context";

/* eslint-disable-next-line */
export type ChartProps = {
    config: IChartConfig
}

export class Chart extends Component<ChartProps> {
    override render() {
        return (
            <ChartContext.Provider value={this.props.config}>
                <div style={{ height: '90vh'}}>
                    <ChartContainer></ChartContainer>
                </div>
            </ChartContext.Provider>
        );
    }
}

export default Chart;
