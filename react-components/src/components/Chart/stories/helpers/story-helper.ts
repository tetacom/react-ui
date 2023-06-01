import {BasePoint, IChartConfig, Series} from '../../model/public-api'

import {fakerRU as faker} from '@faker-js/faker'
import {SeriesType} from "../../model/enum/series-type.enum";
import {randomInt} from 'd3';
import {cssColors} from "./css-colors";
import {BarSeries} from "./bar-series";

const seriesType = [SeriesType.line, SeriesType.bar];
const randomColor = randomInt(0, cssColors.length - 1);


const createSeries = (size: number) => {
    return seriesType.map(
        (type: SeriesType, index: number): Series<BasePoint> => {
            return {
                id: index,
                type,
                name: faker.location.city(),
                yAxisIndex: 0,
                xAxisIndex: 0,
                component: type === SeriesType.bar ? BarSeries : null,
                color: cssColors[randomColor()].toLowerCase(),
                data: Array.from(Array(size).keys())
                    .map((key, index, arr) => {
                        const num = faker.number.int({min: 0, max: 6000});
                        const point: BasePoint = {
                            x: num,
                            y: faker.number.int({min: 0, max: 200}),
                        };

                        return point;
                    })
                    .sort((a, b) => a.x - b.x)
                    .map((_, index, arr) => {
                        return {
                            ..._,
                            x: arr[index - 1]?.x,
                            x1: _.x,
                        };
                    }),
            };
        }
    );
};


export const createChart = (size: number): IChartConfig => {
    return {
        name: faker.location.country(),
        bounds: undefined,
        xAxis: [{
            min: 0,
            max: 5000
        },
        ],
        yAxis: [
            {
                visible: true,
            },
        ],
        legend: {
            enable: false,
        },
        series: createSeries(size),
    };
};