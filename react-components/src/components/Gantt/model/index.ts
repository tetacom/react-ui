import React from 'react';
import * as d3 from 'd3';

import { ZoomSize } from './enum/zoom-size.enum';

export interface MilestoneOptions {
  startTime: Date;
  endTime: Date;
}

export interface MilestoneItem<T extends MilestoneOptions> {
  id: number;
  milestones: Array<T>;
}

export interface GanttProps<T extends MilestoneOptions> {
  items: Array<MilestoneItem<T>>;

  zoom?: ZoomSize;

  // Обратный вызов для кастомного рендера вехи
  onMilestoneRender?: (
    item: MilestoneItem<T>,
    scale: d3.ScaleTime<number, number>,
  ) => React.ReactElement;

  // Обратный вызов для кастомного рендера айтема левой панели
  onItemRender?: (item: MilestoneItem<T>) => JSX.Element;
}
