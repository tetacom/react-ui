import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../index';
import img from '../docs/assets/avatar.jpg';
import { AvatarDocs } from '../docs';
import { AvatarProps, SizeType } from '../model';
import { Stack } from '../../Stack';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      page: AvatarDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

const Picture = <img src={img} alt="" />;

export const Default: Story = {
  args: {
    name: 'Isaac Newton',
    picture: Picture,
    alt: '',
    srcSet: '',
    shape: 'circle',
    size: '200',
  },
};

const names: { id: string; name: string; picture?: AvatarProps['picture'] }[] =
  [
    {
      id: '1',
      name: 'Isaac Newton',
      picture: img,
    },
    {
      id: '2',
      name: 'Isaac Newton',
    },
    {
      id: '3',
      name: 'Albert Einstein',
    },
    {
      id: '4',
      name: 'Galileo Galilei',
    },
    {
      id: '5',
      name: 'Michael Faraday',
    },
  ];
const avatars: { id: string; size: SizeType }[] = [
  {
    id: '1',
    size: '26',
  },
  {
    id: '2',
    size: '28',
  },
  {
    id: '3',
    size: '32',
  },
  {
    id: '4',
    size: '44',
  },
  {
    id: '5',
    size: '64',
  },
  {
    id: '6',
    size: '128',
  },
  {
    id: '7',
    size: '200',
  },
];

const makeAvatars = (shape: AvatarProps['shape']) => (
  <Stack>
    {names.map(({ id, name, picture }) => (
      <Stack key={id} direction="column" size={20}>
        {avatars.map(({ id, size }) => (
          <Avatar
            shape={shape}
            name={name}
            key={id}
            size={size}
            picture={picture}
            alt={name}
          />
        ))}
      </Stack>
    ))}
  </Stack>
);

export const CircleAvatars: Story = {
  render: () => makeAvatars('circle'),
};

export const BrickAvatars: Story = {
  render: () => makeAvatars('brick'),
};

export const RoundAvatars: Story = {
  render: () => makeAvatars('round'),
};
