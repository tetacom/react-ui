import { ScaleType } from './enum';

export type AxisOptions = {
  title?: string;
  min?: number;
  max?: number;
  scaleType?: {
    type?: ScaleType;
    base?: number;
  };
  visible?: boolean;
  inverted?: boolean;
  niceTicks?: boolean;
};
