import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '../index';
import { TypographyDocs } from '../docs';

const { Paragraph } = Typography;

const meta: Meta<typeof Paragraph> = {
  title: 'General/Typography/Paragraph',
  component: Paragraph,
  parameters: {
    docs: {
      page: TypographyDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
  args: {
    children: 'Typography',
    fontVariant: undefined,
    resetMargin: false,
  },
};

export const H4: Story = {
  name: 'Paragraph: h4 font variant',
  args: {
    ...Default.args,
    fontVariant: 'h4',
  },
};
