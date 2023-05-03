import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '../index';
import { TypographyDocs } from '../docs';

const { Title } = Typography;

const meta: Meta<typeof Title> = {
  title: 'General/Typography/Title',
  component: Title,
  parameters: {
    docs: {
      page: TypographyDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    children: 'Typography',
    level: undefined,
    fontVariant: undefined,
  },
};

export const H2: Story = {
  name: 'Heading: h2',
  args: {
    ...Default.args,
    level: 2,
  },
};

export const H3: Story = {
  name: 'Heading: h3',
  args: {
    ...Default.args,
    level: 3,
  },
};

export const H4: Story = {
  name: 'Heading: h4 with any font variant',
  args: {
    ...Default.args,
    level: 4,
    fontVariant: 'body1',
  },
};
