import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '../index';
import { TypographyDocs } from '../docs';

const { Link } = Typography;

const meta: Meta<typeof Link> = {
  title: 'General/Typography/Link',
  component: Link,
  parameters: {
    docs: {
      page: TypographyDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: 'Typography',
    fontVariant: undefined,
    resetMargin: false,
  },
};

export const H4: Story = {
  name: 'Link: h4 font variant',
  args: {
    ...Default.args,
    fontVariant: 'h4',
  },
};
