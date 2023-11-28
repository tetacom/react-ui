import { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { fakerRU } from '@faker-js/faker';

import { Gantt } from '../index';
import { MilestoneItem, BaseMilestone } from '../model';
import { rigs } from '../rigs';
import { ZoomSize } from '../model/public-api';

const meta: Meta<typeof Gantt> = {
  title: 'Data Display/Gantt',
  component: Gantt,
  argTypes: {

  },
};

export default meta;
