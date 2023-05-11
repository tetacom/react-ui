import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../index';
// import { ChipDocs } from '../docs';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  // argTypes: { onClick: { action: 'clicked' }, onClose: { action: 'closed' } },
  // parameters: {
  //   docs: {
  //     page: ChipDocs,
  //   },
  // },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

const Picture = (
  <img
    src="https://sun9-80.userapi.com/impg/EpLIGrGoCxK0V8QzZbBrHsRy4T43yctZ9DIfzQ/cw4GUec5FFc.jpg?size=200x256&quality=96&sign=824c8edaf8461151a521a21cf7776dac&type=album"
    alt="test"
  />
);

export const Default: Story = {
  args: {
    name: 'za',
    shape: 'circle',
    size: '200',
    // picture: Picture,
  },
};
