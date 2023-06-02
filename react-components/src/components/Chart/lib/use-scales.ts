import {BasePoint, IChartConfig, Series} from "../model/public-api";
import {defaultScalesMapping} from "./default-scales-mapping";
import {ScaleType} from "../model/enum/scale-type";
import {AxisOptions} from "../model/axis-options";
import * as d3 from 'd3';

const extentAccessorMap = new Map<'x' | 'y',
    (point: BasePoint) => number>()
    .set('x', (_) => _.x)
    .set('y', (_) => _.y);

const createScale = (options: { axis: AxisOptions, config: IChartConfig, orientation: 'x' | 'y', size: DOMRect}): any => {
    const {axis, config, orientation, size} = options;

    const hasMin = axis?.min;
    const hasMax = axis?.max;

    let extremes = [0, 0]

    if (!hasMin || !hasMax) {
        const linkedSeries = config?.series?.filter((series: Series<BasePoint>, index) => {
            return series[orientation === 'x' ? 'xAxisIndex' : 'yAxisIndex'] === index
        })

        const data = linkedSeries?.reduce((acc: BasePoint[], current) => {
            return acc.concat(current.data);
        }, []) || [];

        const accessor = extentAccessorMap.get(orientation);
        extremes = data?.length > 1 ? d3.extent(data, accessor!) as any : [0, 0];

    }

    if (axis.min) {
        extremes[0] = axis.min;
    }

    if (axis.max) {
        extremes[1] = axis.max;
    }

    return defaultScalesMapping.get(options.axis?.scaleType?.type || ScaleType.linear)().domain(extremes).range([0, orientation === 'x' ? size.width : size.height])
}

export const useScales = (config: IChartConfig, size: DOMRect) => {
    const x = config.xAxis.map((options) => createScale({axis: options, config, orientation: 'x', size}))
    const y = config.yAxis.map((options) => createScale({axis: options, config, orientation: 'y', size}))

    return [x, y]
}