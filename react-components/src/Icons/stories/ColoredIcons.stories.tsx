import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { ColoredIcon } from '../index';
import { BaseProps } from '../types';
import { ColoredIconDocs } from '../docs/coloredIcon';

export default {
  title: 'General/Icons/ColoredIcon',
  component: ColoredIcon,
  args: {
    name: 'coinColor',
    size: 64,
  },
  parameters: {
    docs: {
      page: ColoredIconDocs,
    },
  },
} as ComponentMeta<(args: BaseProps) => ReturnType<typeof ColoredIcon>>;

const Template: ComponentStory<
  (args: BaseProps) => ReturnType<typeof ColoredIcon>
> = ({ ...args }) => <ColoredIcon {...args} />;

export const CoinColor = Template.bind({});
CoinColor.args = {};

export const ImproveColor = Template.bind({});
ImproveColor.args = {
  name: 'improveColor',
};

export const TestAnalyzeGroupColor = Template.bind({});
TestAnalyzeGroupColor.args = {
  name: 'testAnalyzeGroupColor',
};
