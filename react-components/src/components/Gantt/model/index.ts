import React from 'react';
import * as d3 from 'd3';

import { ZoomSize } from './enum/zoom-size.enum';
import { DriveType } from './enum/drive-type.enum';

export interface MilestoneOptions {
  startTime: Date;
  endTime: Date;
}

export interface MilestoneItem<T extends MilestoneOptions> {
  id: number;
  name: string;
  liftingCapability: number;
  driveType: DriveType;
  hasTopDrive: boolean;
  contractorName: string;
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
  onItemRender?: (item: MilestoneItem<T>) => React.ReactElement;

  // Высота диаграммы
  height?: React.CSSProperties['height'];

  // Минимальное и максимальное значение production
  productionEndpoints: [number, number];
}
