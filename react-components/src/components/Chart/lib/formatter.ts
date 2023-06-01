// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as d3 from 'd3';
import { ScaleType } from "../model/enum/scale-type"

export const defaultFormatters = new Map<ScaleType, (...args: never) => string>()
    .set(ScaleType.linear, d3.format(',.5~r'))
    .set(ScaleType.time, d3.timeFormat('%d.%m.%Y'))
    .set(ScaleType.log, d3.format('~s'))
    .set(ScaleType.symlog, d3.format('~s'))
    .set(ScaleType.pow, d3.format('~s'))
    .set(ScaleType.sqrt, d3.format('~s'))
    .set(ScaleType.band, (_) => {return _})