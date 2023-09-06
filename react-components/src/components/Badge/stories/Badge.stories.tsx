import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../index';
import { BadgeDocs } from '../docs';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    docs: {
      page: BadgeDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Label',
    view: 'stroke',
    palette: 'primary',
  },
};
