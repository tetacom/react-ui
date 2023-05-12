import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '../index';
import { Button } from '../../Button';
import { Typography } from '../../Typography';
import { StackDocs } from '../docs';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    docs: {
      page: StackDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  render: ({ ...args }) => (
    <Stack {...args}>
      <Typography.Paragraph style={{ margin: 0 }}>Stack</Typography.Paragraph>
      <Button>Primary</Button>
      <Button view="outline" size="large">
        Outline
      </Button>
      <Button view="ghost">Ghost</Button>
    </Stack>
  ),
  args: {
    direction: 'row',
    align: 'center',
    size: 16,
    divider: true,
    wrap: false,
    block: false,
  },
};
