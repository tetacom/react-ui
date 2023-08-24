import { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { fakerRU } from '@faker-js/faker';

import { Gantt } from '../index';
import { MilestoneItem, MilestoneOptions } from '../model';
import { rigs } from '../rigs';
import { ZoomSize, DriveType } from '../model/public-api';

const meta: Meta<typeof Gantt> = {
  title: 'Data Display/Gantt',
  component: Gantt,
  argTypes: {
    zoom: {
      defaultValue: ZoomSize.year,
      options: [ZoomSize.year, ZoomSize.month],
      control: { type: 'select' },
    },
  },
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
  distance?: number;
  production?: number;
  idd?: number;

  constructor(options: {
    DrillingRigId?: number;
    ClusterId?: number;
    WellId?: number;
    OperationType?: number;
    StartTime?: Date;
    EndTime?: Date;
    distance?: number;
    production?: number;
    idd?: number;
  }) {
    this.drillingRigId = options?.DrillingRigId;
    this.clusterId = options?.ClusterId;
    this.wellId = options?.WellId!;
    this.operationType = options?.OperationType;
    this.startTime = dayjs(options?.StartTime)?.startOf('day').toDate();
    this.endTime = dayjs(options?.EndTime)?.endOf('day').toDate();
    this.production = options?.production;
    this.idd = options?.idd;
    this.distance = options?.distance;
  }
}

interface CustomMilestone extends MilestoneOptions {
  production: number;
  clusterType: 'drilling' | 'move';
  clusterId?: number;
  items?: ScheduleItem[];
}

const scheduleItems = rigs?.ScheduleLibs?.map((_: any) => {
  return new ScheduleItem(_);
});

const drillingRigIds = new Set(scheduleItems.map((_) => _.drillingRigId));

const rigItems: MilestoneItem<CustomMilestone>[] = [];

[...drillingRigIds].forEach((rigId) => {
  const clusters = scheduleItems.filter((_) => _.drillingRigId === rigId);
  const clusterIds = new Set(clusters.map((_) => _.clusterId));

  const rigItem: MilestoneItem<CustomMilestone> = {
    id: rigId!,
    name: 'ООО "Татбурнефть"',
    liftingCapability: 125,
    driveType: Math.random() > 0.5 ? DriveType.Electric : DriveType.Diesel,
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

export const Default: Story = {
  args: {
    items: rigItems,
    height: 'calc(100vh - 32px)',
  },
};
