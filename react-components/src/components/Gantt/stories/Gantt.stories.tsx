import type { Meta, StoryObj } from '@storybook/react';

import { Gantt } from '../index';

import dataResponse from './data.json';
import { ZoomSize } from '@tetacom/react-components';
import { SidebarItem } from './ui/sidebar-item';
import { ScheduleDto } from './types';
import { createMilestoneItems } from './create-milestone-items';

const meta: Meta<typeof Gantt> = {
  title: 'Data Display/Gantt',
  component: Gantt,
};
export default meta;

type Story = StoryObj<typeof Gantt>;

const GanttStory = () => {
  // @ts-ignore
  const data: ScheduleDto = dataResponse;

  return (
    <Gantt
      config={{
        items: createMilestoneItems(data),
        sidebarComponent: SidebarItem,
        zoom: ZoomSize.year,
        height: '100%',
      }}
    />
  );
};

export const Default: Story = {
  render: () => <GanttStory />,
};
