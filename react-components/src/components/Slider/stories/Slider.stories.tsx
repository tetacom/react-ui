import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../index';

const meta: Meta<typeof Slider> = {
  title: 'Data Entry/Slider',
  component: Slider,
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (props) => {
    return (
      <div>
        <Slider {...props} />
      </div>
    );
  },
  argTypes: {
    min: { type: 'number' },
    max: { type: 'number' },
    step: { type: 'number' },
  },
  args: {
    values: [-700, 50, 100, 200],
  },
};
