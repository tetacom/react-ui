import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Icon } from '../icon';
import { IconProps } from '../model';
import { IconDocs } from '../docs/icon';

export default {
  title: 'General/Icons/Icon',
  component: Icon,
  args: {
    name: 'star',
    color: 'var(--color-primary-50)',
    size: 64,
  },
  parameters: {
    docs: {
      page: IconDocs,
    },
  },
} as ComponentMeta<(args: IconProps) => ReturnType<typeof Icon>>;

const Template: ComponentStory<
  (args: IconProps) => ReturnType<typeof Icon>
> = ({ ...args }) => <Icon {...args} />;

export const Star = Template.bind({});
Star.args = {};

export const Table = Template.bind({});
Table.args = {
  name: 'table',
};

export const User = Template.bind({});
User.args = {
  name: 'user',
};
