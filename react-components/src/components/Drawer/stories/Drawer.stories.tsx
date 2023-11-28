import type { Meta, StoryObj } from '@storybook/react';

import { Drawer } from '../index';
import { DefaultDrawer, DrawerDocs } from '../docs';
import { Button } from '../../Button';

const meta: Meta<typeof Drawer> = {
  title: 'Feedback/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      page: DrawerDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: ({ ...args }) => <DefaultDrawer {...args} />,
  args: {
    placement: 'right',
    title: 'Заголовок',
    extra: [<Button key="1">Test1</Button>, <Button key="2">Test2</Button>],
    width: 300,
    height: 200,
    zIndex: 100,
  },
};
