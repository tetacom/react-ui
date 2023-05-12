import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../index';
import { InputDocs } from '../docs';

const meta: Meta<typeof Input> = {
  title: 'Data Entry/Input',
  component: Input,
  argTypes: { onChange: { action: 'changed' } },
  parameters: {
    docs: {
      page: InputDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};
