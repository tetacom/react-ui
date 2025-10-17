import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Divider } from '../index';
import { Typography } from '../../Typography';

import { Stack } from '../../Stack';

import dividerClassNames from '../style.module.scss';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';

const { Title, Paragraph, Text } = Typography;

export const DividerDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Разделительная линия
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {dividerClassNames.divider}
    </Paragraph>

    <br />

    <Paragraph>Разделительная линия разделяет различное содержимое</Paragraph>

    <Title level={2} fontVariant="h6">
      Когда использовать
    </Title>
    <ul>
      <Text>
        <li>Разделите статьи на части</li>
      </Text>
      <Text>
        <li>Разделите встроенный текст и ссылки</li>
      </Text>
    </ul>

    <Stack divider={<Divider />} align="start" style={{ margin: '24px 0' }}>
      <Button>Item 1</Button>
      <Button>Item 2</Button>
      <Button>Item 3</Button>
      <Avatar name="tmp" size="128" />
    </Stack>

    <br />
    <br />
    <Primary />
    <Controls />
    <Stories />
  </Unstyled>
);
