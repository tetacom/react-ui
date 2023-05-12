import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

// import { Input } from '../index';
import { Typography } from '../../Typography';

import inputClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const InputDocs = () => {
  return (
    <Unstyled>
      <Title
        level={1}
        fontVariant="h4"
        style={{
          marginBottom: 0,
        }}
      >
        Чип
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {inputClassNames.input}
      </Paragraph>

      <br />

      <Paragraph>
        Чип — это компактные элементы, представляющие ввод, атрибут или
        действие.
      </Paragraph>
      <Paragraph>
        Чипы позволяют пользователям вводить информацию, делать выбор,
        фильтровать содержимое или запускать действия.
      </Paragraph>
      <Paragraph>
        Несмотря на то, что он включен сюда как отдельный компонент, наиболее
        распространенное использование будет в той или иной форме ввода, поэтому
        некоторые продемонстрированные здесь действия не показаны в контексте.
      </Paragraph>

      <br />
      <br />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </Unstyled>
  );
};
