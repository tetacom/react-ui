import {
  ChartConfig,
  ComponentProps,
  CustomComponent,
  SeriesType,
} from '../model';
import { randomInt } from 'd3';
import { cssColors } from './css-color';
import { Series } from '../model/series';
import { BasePoint } from '../model/base-point';
import { fakerRU as faker } from '@faker-js/faker';
import { BubbleSeries } from './bubble-series';

const randomColor = randomInt(0, cssColors.length - 1);

const seriesType = [SeriesType.line];

export type BubblePoint = BasePoint & {
  radius: number;
};

export const createSeries = (size: number) => {
  return seriesType.map(
    (type: SeriesType, index: number): Series<BubblePoint> => {
      return {
        id: index,
        type,
        name: faker.animal.bear(),
        yAxisIndex: 0,
        xAxisIndex: 0,
        color: cssColors[randomColor()].toLowerCase(),
        component: BubbleSeries,
        data: Array.from(Array(size).keys()).map((key, index, arr) => {
          const num = faker.number.int({ min: 0, max: 6000 });
          const radius = faker.number.int({ min: 0, max: 50 });

          const point: BubblePoint = {
            x: num,
            y: faker.number.int({ min: 0, max: 200 }),
            radius,
          };

          return point;
        }),
      };
    },
  );
};

export const createChart = (size: number, inverted = false): ChartConfig => {
  return {
    name: 'Chart',
    inverted: inverted,
    xAxis: [
      {
        visible: true,
        niceTicks: true,
        inverted: false,
      },
    ],
    yAxis: [
      {
        visible: true,
        inverted: true,
      },
    ],
    series: createSeries(size),
  };
};
