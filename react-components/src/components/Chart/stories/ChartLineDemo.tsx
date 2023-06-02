import Chart from "../index";
import {Button, IChartConfig} from "tetacom/react-components";
import {useState} from "react";

function ChartLineDemo(props: { createChart: (size: number) => {} }) {
    const {createChart} = props;

    const [config, setConfig] = useState(createChart(500));

    return (<><Button onClick={() => setConfig(createChart(500))}>Новые данные</Button> <Chart
        config={config as IChartConfig}/></>)
}

export {ChartLineDemo}