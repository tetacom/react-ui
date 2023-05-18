import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from '../index';
import { Button } from '../../Button';
import { DropdownDocs } from '../docs';
import { DropdownList } from '../docs/list';

const meta: Meta<typeof Dropdown> = {
  title: 'Data Display/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: DropdownDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: ({ ...args }) => (
    <Dropdown {...args} dropdown={<DropdownList />}>
      <Button size="large">Click me</Button>
    </Dropdown>
  ),
  args: {
    open: false,
  },
};
