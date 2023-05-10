import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Toggle } from '../index';
import { Typography } from '../../Typography';
import { Stack } from '../../Stack';

import s from './style.module.scss';
import toggleClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const ToggleDocs = () => (
  <Unstyled>
    <div className={s.root}>
      <Title
        level={1}
        fontVariant="h4"
        style={{
          marginBottom: 0,
        }}
      >
        Переключатель
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {toggleClassNames.toggle}
      </Paragraph>

      <br />

      <Paragraph>
        Toggle (переключатель) — компонент, который позволяет переключаться
        между состояниями.
      </Paragraph>

      <Title level={2} fontVariant="h6">
        Как использовать
      </Title>
      <Paragraph>
        Функционально тогл — аналог чекбокса, но контекст их использования может
        отличаться. Тогл нельзя использовать для выбора элементов в списке.
        Например, выбрать несколько параметров.
      </Paragraph>
      <Paragraph>
        Тогл больше и заметнее чекбокса. Хорошо, когда на странице 1 тогл,
        максимум 2–3.
      </Paragraph>

      <Title level={2} fontVariant="h6">
        Состояние выбора тоглов
      </Title>
      <Paragraph>
        При клике пользователь переводит чекбокс из состояния Off в On и
        наоборот.
      </Paragraph>
      <Stack size={96}>
        <div>
          <Paragraph fontVariant="captionSemi">Off</Paragraph>
          <Toggle />
        </div>
        <div>
          <Paragraph fontVariant="captionSemi">On</Paragraph>
          <Toggle defaultChecked />
        </div>
      </Stack>

      <Title level={2} fontVariant="h6">
        Состояния тоглов
      </Title>
      <Paragraph>Есть 5 состояний тоглов:</Paragraph>
      <ol>
        <Text>
          <li>Rest (покой)</li>
        </Text>
        <Text>
          <li>Hover (наведение)</li>
        </Text>
        <Text>
          <li>Press (нажатие)</li>
        </Text>
        <Text>
          <li>Focus (в фокусе)</li>
        </Text>
        <Text>
          <li>Disable (недоступно)</li>
        </Text>
      </ol>
      <Stack size={96} wrap>
        <div>
          <Paragraph fontVariant="captionSemi">Rest</Paragraph>
          <Stack size={12} direction="column">
            <Toggle />
            <Toggle defaultChecked />
          </Stack>
        </div>
        <div>
          <Paragraph fontVariant="captionSemi">Hover me</Paragraph>
          <Stack size={12} direction="column">
            <Toggle />
            <Toggle defaultChecked />
          </Stack>
        </div>
        <div>
          <Paragraph fontVariant="captionSemi">Press me</Paragraph>
          <Stack size={12} direction="column">
            <Toggle />
            <Toggle defaultChecked />
          </Stack>
        </div>
        <div>
          <Paragraph fontVariant="captionSemi">Focus with keyboard</Paragraph>
          <Stack size={12} direction="column">
            <Toggle autoFocus />
            <Toggle defaultChecked />
          </Stack>
        </div>
        <div>
          <Paragraph fontVariant="captionSemi">Disable</Paragraph>
          <Stack size={12} direction="column">
            <Toggle disabled />
            <Toggle defaultChecked disabled />
          </Stack>
        </div>
      </Stack>

      <br />
      <br />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </div>
  </Unstyled>
);
