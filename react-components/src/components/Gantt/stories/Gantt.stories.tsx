import { Meta, StoryObj } from '@storybook/react';
import { Gantt } from '../index';
import rigs from '../rigs.json';
import * as dayjs from 'dayjs';
import { fakerRU } from '@faker-js/faker';
import { MilestoneItem, MilestoneOptions } from '../model/gantt-props';

const meta: Meta<typeof Gantt> = {
  title: 'Data Display/Gantt',
  component: Gantt,
};

export default meta;

type Story = StoryObj<typeof Gantt>;

class ScheduleItem {
  drillingRigId?: number;
  clusterId?: number;
  wellId: number;
  operationType?: number;
  startTime: Date;
  endTime: Date;
  constructor(options: {
    DrillingRigId?: number;
    ClusterId?: number;
    WellId?: number;
    OperationType?: number;
    StartTime?: Date;
    EndTime?: Date;
  }) {
    this.drillingRigId = options?.DrillingRigId;
    this.clusterId = options?.ClusterId;
    this.wellId = options?.WellId!;
    this.operationType = options?.OperationType;
    this.startTime = dayjs(options?.StartTime).startOf('day').toDate();
    this.endTime = dayjs(options?.EndTime).endOf('day').toDate();
  }
}

interface CustomMilestone extends MilestoneOptions {
  production: number;
  clusterType: 'drilling' | 'move';
  clusterId?: number;
  items?: ScheduleItem[];
}

const scheduleItems = (rigs.ScheduleLibs as [])?.map((_) => {
  return new ScheduleItem(_);
});

const drillingRigIds = new Set(scheduleItems.map((_) => _.drillingRigId));

const rigItems: MilestoneItem<CustomMilestone>[] = [];

[...drillingRigIds].forEach((rigId) => {
  const clusters = scheduleItems.filter((_) => _.drillingRigId === rigId);
  const clusterIds = new Set(clusters.map((_) => _.clusterId));

  const rigItem: MilestoneItem<CustomMilestone> = {
    id: rigId!,
    milestones: [],
  };

  [...clusterIds].forEach((clusterId) => {
    const rows = clusters.filter(
      (_) =>
        _.clusterId === clusterId &&
        (_.operationType === 0 || _.operationType === 2),
    );

    const moveRows = clusters.filter(
      (_) => _.clusterId === clusterId && _.operationType === 1,
    );

    if (rows?.length > 0) {
      rigItem.milestones.push({
        startTime: rows[0].startTime,
        endTime: rows[rows.length - 1]?.endTime,
        clusterId: clusterId,
        production: fakerRU.number.int({ min: 1000, max: 3000 }),
        clusterType: 'drilling',
        items: rows,
      });
    }

    if (moveRows?.length > 0) {
      rigItem.milestones.push({
        startTime: moveRows[0].startTime,
        endTime: moveRows[moveRows.length - 1]?.endTime,
        production: fakerRU.number.int({ min: 1000, max: 3000 }),
        clusterType: 'move',
      });
    }
  });

  rigItems.push(rigItem);
});

console.log(rigItems);

export const Default: Story = {
  args: {
    items: rigItems,
  },
};
