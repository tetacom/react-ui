import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from '../index';
import { Button } from '../../Button';
import { TooltipDocs } from '../docs';

const meta: Meta<typeof Tooltip> = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      page: TooltipDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: ({ ...args }) => (
    <Tooltip {...args}>
      <Button size="large">Move cursor here</Button>
    </Tooltip>
  ),
  args: {
    title:
      'Это поле не может содержать значение меньше 0,1, потому что это не поле, а кнопка',
    offset: 0,
  },
};
