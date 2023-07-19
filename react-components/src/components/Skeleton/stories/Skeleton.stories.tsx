import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from '../index';
import { SkeletonDocs } from '../docs';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      page: SkeletonDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    columns: 200,
  },
};

export const TextBlock: Story = {
  args: {
    rows: 10,
    columns: 50,
    columnsUnit: '%',
    isTable: false,
  },
};

export const Table: Story = {
  args: {
    rows: 10,
    columns: [5, 20, 25, 15, 15],
    isTable: true,
    columnsUnit: 'fr',
  },
};
