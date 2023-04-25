import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '../index';
import { SpinnerDocs } from '../docs';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      page: SpinnerDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    color: 'var(--color-primary-50)',
    size: 64,
  },
};
