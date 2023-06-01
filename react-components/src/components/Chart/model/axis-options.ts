import {ScaleType} from "./enum/scale-type";

export type AxisOptions = {
    title?: string;
    min?: number;
    max?: number;
    scaleType?: {
        type?: ScaleType;
        base?: number;
    };
    visible?: boolean;
    tickFormat?: (d: never) => string;
    zoom?: boolean;
    inverted?: boolean;
    opposite?: boolean;
    niceTicks?: boolean;
}
