import {ScaleType} from "../model/enum/scale-type";
import * as d3 from 'd3';

export const defaultScalesMapping = new Map<ScaleType, any>()
    .set(ScaleType.linear, d3.scaleLinear)
    .set(ScaleType.log, d3.scaleLog)
    .set(ScaleType.symlog, d3.scaleSymlog)
    .set(ScaleType.pow, d3.scalePow)
    .set(ScaleType.sqrt, d3.scaleSqrt)
    .set(ScaleType.time, d3.scaleTime)
    .set(ScaleType.band, d3.scaleBand);