import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../index';
import { CardDocs } from '../docs';

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    docs: {
      page: CardDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'Floyd Miles',
    style: {
      width: 300,
      borderRadius: 0,
    },
  },
};
