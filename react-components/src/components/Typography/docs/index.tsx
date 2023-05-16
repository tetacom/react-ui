import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Typography } from '../index';

import typoClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const TypographyDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Типографика
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {typoClassNames.typo}
    </Paragraph>

    <br />

    <Paragraph>
      Typography (типографика) — компонент, который используется для текста,
      включая заголовки, параграфы, ссылки и многое другое..
    </Paragraph>

    <Title level={2} fontVariant="h6">
      Когда использовать
    </Title>
    <Paragraph>Основные правила применения кнопки:</Paragraph>
    <ul>
      <Text>
        <li>
          Когда нужно отобразить заголовок или содержимое абзаца в
          статьях/блогах/заметках;
        </li>
      </Text>
      <Text>
        <li>Когда вам нужны копируемые/редактируемые тексты;</li>
      </Text>
    </ul>

    <Title level={2} fontVariant="h6">
      Title (Заголовки)
    </Title>
    <Paragraph>
      Заголовки принимают атрибут <Text fontVariant="h6">level</Text> со
      значениями от 1 до 6, определяющий тег заголовка.
    </Paragraph>

    <Title level={2} fontVariant="h6">
      Параграф, текст или ссылка
    </Title>
    <Paragraph>
      Атрибут <Text fontVariant="h6">fontVariant</Text> определяет вариант
      текстового токена
    </Paragraph>

    <br />
    <br />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </Unstyled>
);
