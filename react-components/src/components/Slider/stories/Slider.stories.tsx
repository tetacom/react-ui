import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../index';
import { SliderDocs } from '../docs';

const meta: Meta<typeof Slider> = {
  title: 'Data Entry/Slider',
  component: Slider,
  parameters: {
    docs: {
      page: SliderDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (props) => {
    return <Slider {...props} />;
  },
  argTypes: {
    min: { type: 'number' },
    max: { type: 'number' },
    step: { type: 'number' },
  },
  args: {
    min: -700,
    max: 200,
    step: 10,
    values: [
      { key: 'first', value: -700 },
      { key: 'second', value: 50 },
      { key: 'third', value: 100 },
      { key: 'fourth', value: 200 },
    ],
  },
};
