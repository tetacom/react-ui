import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Typography } from '../index';
import { TitleProps } from '../title';
import { TypographyDocs } from '../docs';

const { Title } = Typography;

export default {
  title: 'General/Typography/Title',
  component: Title,
  args: {
    children: 'Typography',
    level: 1,
    fontVariant: undefined,
  },
  parameters: {
    docs: {
      page: TypographyDocs,
    },
  },
} as ComponentMeta<(args: TitleProps) => ReturnType<typeof Title>>;

const Template: ComponentStory<
  (args: TitleProps) => ReturnType<typeof Title>
> = ({ ...args }) => {
  return <Title {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const H2 = Template.bind({});
H2.storyName = 'Heading: h2';
H2.args = {
  level: 2,
};

export const H3 = Template.bind({});
H3.storyName = 'Heading: h3';
H3.args = {
  level: 3,
};

export const H4 = Template.bind({});
H4.storyName = 'Heading: h4 with any font variant';
H4.args = {
  level: 2,
  fontVariant: 'body1',
};
