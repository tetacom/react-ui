import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Avatar } from '../index';
import { Typography } from '../../Typography';
import { Stack } from '../../Stack';
import img from './assets/avatar.jpg';

import avatarClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const AvatarDocs = () => {
  return (
    <Unstyled>
      <Title
        level={1}
        fontVariant="h4"
        style={{
          marginBottom: 0,
        }}
      >
        Аватар
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {avatarClassNames.avatar}
      </Paragraph>

      <br />

      <Paragraph>
        Аватар — графическое изображение пользователя, фотография или рисунок.
        Он нужен, чтобы быстро узнавать пользователя (например, в ветке
        комментариев), а ещё — чтобы пользователь мог узнать сам себя. Например,
        проверить, что вошёл в аккаунт под нужным логином.
      </Paragraph>
      <Paragraph>
        В библиотеке сущесвтует два вида аватаров: изображения и цветные
        буквенные. Также, они различаются по размерам и скруглениям.
      </Paragraph>

      <Title level={2} fontVariant="h6">
        Как использовать
      </Title>
      <Paragraph>Аватар нужен в случаях:</Paragraph>
      <ul>
        <Text>
          <li>Если на странице есть возможность добавить комментарий;</li>
        </Text>
        <Text>
          <li>Отображение профиля в хедере или же в других компонентах.</li>
        </Text>
      </ul>
      <Paragraph>
        В первом случае, при наведении появляется хинт, который показывает, кто
        именно оставил комментарий. Во втором случае, при нажатии происходит
        переход на страницу профиля или же вызывает выпадающий список с
        навигацией.
      </Paragraph>

      <Title level={2} fontVariant="h6">
        Скругления и размеры
      </Title>
      <Paragraph>
        В основном, в наших продуктах используются круглые аватары (type: round)
        с размером 28x28.
      </Paragraph>
      <Stack size={16} style={{ margin: '24px 0' }} block>
        <Avatar name="МД" size="64" />
        <Avatar name="МС" size="64" shape="brick" />
        <Avatar name="яя" size="64" shape="round" />
      </Stack>

      <Stack size={20} align="start" style={{ margin: '24px 0' }}>
        <Stack direction="column" size={4}>
          <Avatar name="МД" size="26" picture={img} />
          <Text fontVariant="body2">26px</Text>
        </Stack>
        <Stack direction="column" size={4}>
          <Avatar name="МД" size="28" picture={img} />
          <Text fontVariant="body2">28px</Text>
        </Stack>
        <Stack direction="column" size={4}>
          <Avatar name="МД" size="32" picture={img} />
          <Text fontVariant="body2">32px</Text>
        </Stack>
        <Stack direction="column" size={4}>
          <Avatar name="МД" size="44" picture={img} />
          <Text fontVariant="body2">44px</Text>
        </Stack>
        <Stack direction="column" size={4}>
          <Avatar name="МД" size="64" picture={img} />
          <Text fontVariant="body2">64px</Text>
        </Stack>
        <Stack direction="column" size={4}>
          <Avatar name="МД" size="128" picture={img} />
          <Text fontVariant="body2">128px</Text>
        </Stack>
        <Stack direction="column" size={4}>
          <Avatar name="МД" size="200" picture={img} />
          <Text fontVariant="body2">200px</Text>
        </Stack>
      </Stack>

      <Title level={2} fontVariant="h6">
        Цвета
      </Title>
      <Paragraph>
        Цвет генерируется на основе переданного имени, т. е. каждый раз для
        одного и того же имени будет один и тот же цвет.
      </Paragraph>
      <Paragraph>
        На каждый цвет накладывается градиент:{' '}
        <Text fontVariant="title2">
          linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255,
          255, 0) 100%);
        </Text>
      </Paragraph>
      <Paragraph></Paragraph>

      <br />
      <br />
      <Primary />
      <Controls />
      <Stories />
    </Unstyled>
  );
};
