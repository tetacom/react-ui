import React from 'react';

import { Icon } from '../../Icons';
import { List } from '../../List';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';

export const DropdownList = () => (
  <List
    items={[
      {
        key: '1',
        headline: 'Савельева Эмилия Арсентьевна',
        caption: 'Главный',
        picture: img1,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '2',
        headline: 'Бабушкин Олег Ростиславович',
        caption: 'По горшкам',
        picture: img2,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '3',
        headline: 'Петрова Милана Михайловна',
        caption: 'Командный',
        picture: img3,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '4',
        headline: 'Савельева Эмилия Арсентьевна',
        caption: 'Главный',
        picture: img1,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '5',
        headline: 'Бабушкин Олег Ростиславович',
        caption: 'По горшкам',
        picture: img2,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '6',
        headline: 'Петрова Милана Михайловна',
        caption: 'Командный',
        picture: img3,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '7',
        headline: 'Савельева Эмилия Арсентьевна',
        caption: 'Главный',
        picture: img1,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '8',
        headline: 'Бабушкин Олег Ростиславович',
        caption: 'По горшкам',
        picture: img2,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '9',
        headline: 'Петрова Милана Михайловна',
        caption: 'Командный',
        picture: img3,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '10',
        headline: 'Савельева Эмилия Арсентьевна',
        caption: 'Главный',
        picture: img1,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '11',
        headline: 'Бабушкин Олег Ростиславович',
        caption: 'По горшкам',
        picture: img2,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        key: '12',
        headline: 'Петрова Милана Михайловна',
        caption: 'Командный',
        picture: img3,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
    ]}
  />
);
