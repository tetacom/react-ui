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

  // Обратный вызов для кастомного рендера вехи
  onMilestoneRender?: (item: T) => JSX.Element;
}
