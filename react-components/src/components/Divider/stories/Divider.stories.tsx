import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from '../index';

import { DividerDocs } from '../docs';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    docs: {
      page: DividerDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    type: 'horizontal',
    length: 200,
  },
};
