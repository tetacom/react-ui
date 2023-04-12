import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Typography } from '../index';
// import { ButtonDocs } from '../docs';

export default {
  title: 'Typographies/Typography',
  component: Typography,
  args: {
    children: 'Typography',
    yes: true,
  },
  // parameters: {
  //   docs: {
  //     page: ButtonDocs,
  //   },
  // },
} as ComponentMeta<
  (args: React.PropsWithChildren) => ReturnType<typeof Typography>
>;

const Template: ComponentStory<
  (args: React.PropsWithChildren) => ReturnType<typeof Typography>
> = ({ ...args }) => {
  return <Typography {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {};
