import React, { MemoExoticComponent } from 'react';
import * as d3 from 'd3';

import { ZoomSize } from './enum/zoom-size.enum';

export type BaseMilestone = {
  startTime: Date;
  endTime: Date;
};

type MilestoneScale = {
  scale: d3.ScaleTime<number, number>;
};

type Milestone<D extends BaseMilestone> = {
  milestone: D;
};

export type MilestoneComponentProps<D extends BaseMilestone> = Milestone<D> &
  MilestoneScale;

type MilestoneComponent<D extends BaseMilestone> =
  | React.FunctionComponent<MilestoneComponentProps<D>>
  | React.FC<MilestoneComponentProps<D>>
  | MemoExoticComponent<React.FC<MilestoneComponentProps<D>>>;

export interface MilestoneItem<T, D extends BaseMilestone> {
  item: T;
  milestones: Array<D & { component: MilestoneComponent<D> }>;
}

export interface GanttConfig<T, D extends BaseMilestone> {
  items: Array<MilestoneItem<T, D>>;

  // Настройка зума (месяц, год)
  zoom?: ZoomSize;

  sidebarComponent:
    | React.FunctionComponent<T>
    | React.FC<T>
    | MemoExoticComponent<React.FC<T>>;

  // Высота диаграммы
  height?: React.CSSProperties['height'];

  // Контекстное меню
  onContextMenu?: (e: React.MouseEvent) => void;
}
