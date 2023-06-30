import type { Meta, StoryObj } from '@storybook/react';
import Slider from '../index';

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
        <Slider onChange={(e) => console.log(e)} {...props} />
      </div>
    );
  },
  args: {
    values: [-700, 50, 100, 200],
  },
};
