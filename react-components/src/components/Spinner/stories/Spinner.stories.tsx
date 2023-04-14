import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Spinner, SpinnerProps } from '../index';
import { SpinnerDocs } from '../docs';

export default {
  title: 'Feedback/Spinner',
  component: Spinner,
  args: {
    color: 'var(--color-primary-50)',
    size: 64,
  },
  parameters: {
    docs: {
      page: SpinnerDocs,
    },
  },
} as ComponentMeta<(args: SpinnerProps) => ReturnType<typeof Spinner>>;

const Template: ComponentStory<
  (args: SpinnerProps) => ReturnType<typeof Spinner>
> = ({ ...args }) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
