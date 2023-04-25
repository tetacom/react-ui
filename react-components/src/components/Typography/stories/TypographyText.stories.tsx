import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '../index';
import { TypographyDocs } from '../docs';

const { Text } = Typography;

const meta: Meta<typeof Text> = {
  title: 'General/Typography/Text',
  component: Text,
  parameters: {
    docs: {
      page: TypographyDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Typography',
    fontVariant: undefined,
  },
};

export const H4: Story = {
  name: 'Text: h4 font variant',
  args: {
    ...Default.args,
    fontVariant: 'h4',
  },
};
