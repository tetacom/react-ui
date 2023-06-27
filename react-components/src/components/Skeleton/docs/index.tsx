import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Skeleton } from '../index';
import { Typography } from '../../Typography';

import skeletonClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const SkeletonDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Скелетон
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {skeletonClassNames.skeleton}
    </Paragraph>

    <br />

    <div
    // style={{
    //   backgroundColor: 'var(--color-global-bgcard)',
    //   padding: 'var(--radius-6) var(--radius-8)',
    // }}
    >
      <Skeleton rows={1} columns={[5, 20, 25, 15, 15, 20]} />
      <div
        style={{
          margin: '0.5em 0',
          height: 1,
          backgroundColor: ' var(--color-text-5)',
        }}
      />
      <Skeleton rows={10} columns={[5, 20, 25, 15, 15, 20]} />
    </div>

    {/*<Paragraph>*/}
    {/*  Чип — это компактные элементы, представляющие ввод, атрибут или действие.*/}
    {/*</Paragraph>*/}
    {/*<Paragraph>*/}
    {/*  Чипы позволяют пользователям вводить информацию, делать выбор, фильтровать*/}
    {/*  содержимое или запускать действия.*/}
    {/*</Paragraph>*/}
    {/*<Paragraph>*/}
    {/*  Несмотря на то, что он включен сюда как отдельный компонент, наиболее*/}
    {/*  распространенное использование будет в той или иной форме ввода, поэтому*/}
    {/*  некоторые продемонстрированные здесь действия не показаны в контексте.*/}
    {/*</Paragraph>*/}

    <br />
    <br />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </Unstyled>
);
