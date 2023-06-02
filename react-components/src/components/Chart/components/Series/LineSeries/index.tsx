import React, { Component } from 'react';
import styles from './style.module.css';
import {BasePoint, BaseSeriesComponent, BaseSeriesConfig} from '../../../model/public-api'
import * as d3 from 'd3';

function LineSeries(props: BaseSeriesConfig<BasePoint>): React.ReactElement<BaseSeriesComponent<BasePoint>> {
  const {x, y} = props;

  const line =
      d3.line<BasePoint>()
      .x((point) => x(point.x))
      .y((point) => y(point.y))

  return <path
            d={line(props.series.data) as string}
            fill={'none'}
            strokeWidth={1.5}
            stroke={props.series.color}
          />
}

export {LineSeries};
