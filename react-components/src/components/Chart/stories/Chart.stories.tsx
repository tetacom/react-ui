import type { Meta, StoryObj } from '@storybook/react';

import {createChart} from "./helpers/story-helper";
import {ChartLineDemo} from "./ChartLineDemo";

const meta: Meta<typeof ChartLineDemo> = {
  title: 'Data Display/Chart',
  component: ChartLineDemo,
  parameters: {
    docs: {},
  },
};
export default meta;

type Story = StoryObj<typeof ChartLineDemo>;

export const Default: Story = {
  args: {
    createChart: createChart
  }
};
