import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';
import { linkTo } from '@storybook/addon-links';

import { Skeleton } from '../index';
import { Typography } from '../../Typography';

import skeletonClassNames from '../style.module.scss';

const { Title, Paragraph, Text, Link } = Typography;

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

    <Paragraph>
      Укажите заполнитель, пока вы ожидаете загрузки контента или визуализируете
      контент, которого еще не существует.
    </Paragraph>

    <Title
      level={2}
      fontVariant="h6"
      style={{
        marginBottom: 0,
      }}
    >
      Когда использовать
    </Title>
    <ul>
      <Text>
        <li>Когда ресурсу требуется длительное время для загрузки.</li>
      </Text>
      <Text>
        <li>
          Когда компонент содержит много информации, например список или
          таблица.
        </li>
      </Text>
      <Text>
        <li>Работает только при первой загрузке данных.</li>
      </Text>
      <Text>
        <li>
          Может быть заменен{' '}
          <Link onClick={linkTo('Feedback/Spinner')}>спиннер</Link> в любой
          ситуации, но может обеспечить лучший пользовательский опыт.
        </li>
      </Text>
    </ul>

    <br />

    <Skeleton
      rows={12}
      columns={[5, 20, 25, 15, 15, 20]}
      isTable
      columnsUnit="fr"
    />

    <br />
    <br />
    <Primary />
    <Controls />
    <Stories />
  </Unstyled>
);
