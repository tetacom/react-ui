import type { Meta, StoryObj } from '@storybook/react';

import { Chart } from '../index';
import {createChart} from "./helpers/story-helper";

const meta: Meta<typeof Chart> = {
  title: 'Data Display/Chart',
  component: Chart,
  parameters: {
    docs: {},
  },
};
export default meta;

type Story = StoryObj<typeof Chart>;

export const Default: Story = {
  args: {
    config: createChart(500)
  }
};
