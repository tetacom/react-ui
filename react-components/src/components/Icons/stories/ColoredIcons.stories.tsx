import type { Meta, StoryObj } from '@storybook/react';

import { ColoredIcon } from '../coloredIcon';
import { ColoredIconDocs } from '../docs/coloredIcon';

const meta: Meta<typeof ColoredIcon> = {
  title: 'General/Icons/ColoredIcon',
  component: ColoredIcon,
  parameters: {
    docs: {
      page: ColoredIconDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof ColoredIcon>;

export const CoinColor: Story = {
  args: {
    name: 'coinColor',
    size: 64,
  },
};

export const ImproveColor: Story = {
  args: {
    ...CoinColor.args,
    name: 'improveColor',
  },
};

export const TestAnalyzeGroupColor: Story = {
  args: {
    ...CoinColor.args,
    name: 'testAnalyzeGroupColor',
  },
};
