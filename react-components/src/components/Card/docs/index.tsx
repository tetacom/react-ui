import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Card } from '../index';
import { Typography } from '../../Typography';

import cardClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const CardDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Карточка
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {cardClassNames.card}
    </Paragraph>

    <br />

    <Paragraph>Простой прямоугольный контейнер.</Paragraph>
    <Title level={2} fontVariant="h6">
      Когда использовать
    </Title>
    <Paragraph>
      Карточку можно использовать для отображения контента, связанного с одной
      темой. Содержимое может состоять из нескольких элементов разных типов и
      размеров.
    </Paragraph>

    <Card>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque
        culpa cupiditate dolorem ea eum impedit ipsam iusto nemo neque nihil
        nostrum odio possimus praesentium provident quisquam repudiandae
        suscipit, vel!
      </Paragraph>
    </Card>

    <br />
    <br />
    <Primary />
    <Controls />
    <Stories />
  </Unstyled>
);
