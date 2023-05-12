import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Stack } from '../index';
import { Typography } from '../../Typography';
import { Button } from '../../Button';

import s from './style.module.scss';
import stackClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const StackDocs = () => {
  return (
    <Unstyled>
      <div className={s.root}>
        <Title
          level={1}
          fontVariant="h4"
          style={{
            marginBottom: 0,
          }}
        >
          Стек
        </Title>
        <Paragraph
          fontVariant="caption"
          style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
        >
          {stackClassNames.stack}
        </Paragraph>

        <br />

        <Paragraph>
          Стек — это компонент-контейнер для вертикального или горизонтального
          расположения элементов.
        </Paragraph>
        <Paragraph>
          Компонент Stack управляет расположением своих непосредственных
          дочерних элементов по вертикальной или горизонтальной оси с
          необязательным интервалом и разделителями между каждым дочерним
          элементом.
        </Paragraph>

        <Stack className={s.exampleBlock}>
          <Button>Item 1</Button>
          <Button>Item 2</Button>
          <Button>Item 3</Button>
        </Stack>

        <br />
        <br />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <Stories />
      </div>
    </Unstyled>
  );
};
