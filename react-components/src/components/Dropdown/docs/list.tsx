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
      {
        keyValue: '4',
        headline: 'Савельева Эмилия Арсентьевна',
        caption: 'Главный',
        picture: img1,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '5',
        headline: 'Бабушкин Олег Ростиславович',
        caption: 'По горшкам',
        picture: img2,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '6',
        headline: 'Петрова Милана Михайловна',
        caption: 'Командный',
        picture: img3,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '7',
        headline: 'Савельева Эмилия Арсентьевна',
        caption: 'Главный',
        picture: img1,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '8',
        headline: 'Бабушкин Олег Ростиславович',
        caption: 'По горшкам',
        picture: img2,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '9',
        headline: 'Петрова Милана Михайловна',
        caption: 'Командный',
        picture: img3,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '10',
        headline: 'Савельева Эмилия Арсентьевна',
        caption: 'Главный',
        picture: img1,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '11',
        headline: 'Бабушкин Олег Ростиславович',
        caption: 'По горшкам',
        picture: img2,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
      {
        keyValue: '12',
        headline: 'Петрова Милана Михайловна',
        caption: 'Командный',
        picture: img3,
        leftIcon: <Icon name="user" />,
        rightIcon: <Icon name="home" />,
      },
    ]}
  />
);
