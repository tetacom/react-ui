import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Typography } from '../index';
import { LinkProps } from '../types';
import { TypographyDocs } from '../docs';

const { Link } = Typography;

export default {
  title: 'General/Typography/Link',
  component: Link,
  args: {
    children: 'Typography',
    fontVariant: undefined,
  },
  parameters: {
    docs: {
      page: TypographyDocs,
    },
  },
} as ComponentMeta<(args: LinkProps) => ReturnType<typeof Link>>;

const Template: ComponentStory<
  (args: LinkProps) => ReturnType<typeof Link>
> = ({ ...args }) => {
  return <Link {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const H4 = Template.bind({});
H4.storyName = 'Link: h4 font variant';
H4.args = {
  fontVariant: 'h4',
};
