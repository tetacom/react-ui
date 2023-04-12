import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Typography } from '../index';
import { BaseProps } from '../types';
// import { ButtonDocs } from '../docs';

const { Paragraph } = Typography;

export default {
  title: 'General/Typography/Paragraph',
  component: Paragraph,
  args: {
    children: 'Typography',
    fontVariant: undefined,
  },
  // parameters: {
  //   docs: {
  //     page: ButtonDocs,
  //   },
  // },
} as ComponentMeta<(args: BaseProps) => ReturnType<typeof Paragraph>>;

const Template: ComponentStory<
  (args: BaseProps) => ReturnType<typeof Paragraph>
> = ({ ...args }) => {
  return <Paragraph {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const H4 = Template.bind({});
H4.storyName = 'Paragraph: h4 font variant';
H4.args = {
  fontVariant: 'h4',
};
