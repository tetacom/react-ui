import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../index';
import img from '../docs/assets/avatar.jpg';
// import { ChipDocs } from '../docs';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  // argTypes: { onClick: { action: 'clicked' }, onClose: { action: 'closed' } },
  // parameters: {
  //   docs: {
  //     page: ChipDocs,
  //   },
  // },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

const Picture = <img src={img} alt="" />;

export const Default: Story = {
  args: {
    name: 'LA',
    shape: 'circle',
    size: '200',
    picture: Picture,
  },
};
