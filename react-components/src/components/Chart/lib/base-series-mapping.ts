import {SeriesType} from "../model/enum/series-type.enum";
import {LineSeries} from "../components/Series/LineSeries";
import {BaseSeriesComponent, BaseSeriesConfig} from "../model/series";
import {BasePoint} from "tetacom/react-components";
import React from "react";


export const defaultSeriesTypeMapping = new Map<SeriesType, (props: BaseSeriesConfig<BasePoint>) => React.ReactElement<BaseSeriesComponent<BasePoint>>>()
    .set(SeriesType.line, LineSeries)

