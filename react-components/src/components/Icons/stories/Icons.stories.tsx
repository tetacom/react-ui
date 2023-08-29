import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../icon';
import { IconDocs } from '../docs/icon';

const meta: Meta<typeof Icon> = {
  title: 'General/Icons/Icon',
  component: Icon,
  parameters: {
    docs: {
      page: IconDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Star: Story = {
  args: {
    name: 'star',
    color: 'var(--color-primary-50)',
    size: 64,
  },
};

export const Table: Story = {
  args: {
    ...Star.args,
    name: 'table',
  },
};

export const User: Story = {
  args: {
    ...Star.args,
    name: 'user',
  },
};
