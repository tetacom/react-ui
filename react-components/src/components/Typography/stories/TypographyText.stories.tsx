import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Typography } from '../index';
import { BaseProps } from '../types';
import { TypographyDocs } from '../docs';

const { Text } = Typography;

export default {
  title: 'General/Typography/Text',
  component: Text,
  args: {
    children: 'Typography',
    fontVariant: undefined,
  },
  parameters: {
    docs: {
      page: TypographyDocs,
    },
  },
} as ComponentMeta<(args: BaseProps) => ReturnType<typeof Text>>;

const Template: ComponentStory<
  (args: BaseProps) => ReturnType<typeof Text>
> = ({ ...args }) => {
  return <Text {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const H4 = Template.bind({});
H4.storyName = 'Text: h4 font variant';
H4.args = {
  fontVariant: 'h4',
};
