import type { Meta, StoryObj } from '@storybook/react';

import { List } from '../index';
import { Icon } from '../../Icons';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import { ListDocs } from '../docs';

const meta: Meta<typeof List> = {
  title: 'Navigation/List',
  component: List,
  parameters: {
    docs: {
      page: ListDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    divider: true,
    imageSize: 'large',
    imageRound: true,
    checked: true,
    items: [
      {
        keyValue: '1',
        headline: 'Савельева Эмилия Арсентьевна',
        caption: 'Главный',
        picture: img1,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '2',
        headline: 'Бабушкин Олег Ростиславович',
        caption: 'По горшкам',
        picture: img2,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '3',
        headline: 'Петрова Милана Михайловна',
        caption: 'Командный',
        picture: img3,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
    ],
    onClick: (event) => {
      console.info(event);
    },
  },
};
