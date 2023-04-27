import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../index';

const meta: Meta<typeof Checkbox> = {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: true,
    children: 'Checkbox',
    disabled: false,
  },
};
