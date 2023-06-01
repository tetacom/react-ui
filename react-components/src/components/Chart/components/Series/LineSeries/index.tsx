import React, { Component } from 'react';
import styles from './style.module.css';
import {BasePoint, BaseSeriesComponent, BaseSeriesConfig} from '../../../model/public-api'
import {useConfig} from "../../../context/hooks";

function LineSeries(props: BaseSeriesConfig<BasePoint>): React.ReactElement<BaseSeriesComponent<BasePoint>> {
  return <g></g>
}

export {LineSeries};
