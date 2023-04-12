import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import { Typography } from '../index';
import s from './style.module.scss';
import typoClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const TypographyDocs = () => {
  return (
    <div className={s.root}>
      <Title
        level={4}
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

      <Title level={6}>Когда использовать</Title>
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

      <Title level={6}>Title (Заголовки)</Title>
      <Paragraph>
        Заголовки принимают атрибут <Text fontVariant="h6">level</Text> со
        значениями от 1 до 6, определяющий тег заголовка.
      </Paragraph>

      <Title level={6}>Параграф, текст или ссылка</Title>
      <Paragraph>
        Атрибут <Text fontVariant="h6">fontVariant</Text> определяет вариант
        текстового токена
      </Paragraph>

      <br />
      <br />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </div>
  );
};
