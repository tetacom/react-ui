import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from '../index';
import { Icon } from '../../Icons';
import img from '../docs/assets/avatar.jpg';
// import { SpinnerDocs } from '../docs';

const meta: Meta<typeof Chip> = {
  title: 'Data Display/Chip',
  component: Chip,
  // parameters: {
  //   docs: {
  //     page: SpinnerDocs,
  //   },
  // },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Floyd Miles',
    view: 'default',
    closable: true,
    closeIcon: <Icon name="home" />,
    icon: <Icon name="tick" />,
    picture: <img src={img} alt="" />,
    onClose: (event) => {
      console.log('###', event);
    },
  },
};
