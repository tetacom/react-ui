import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Chip } from '../index';
import { Typography } from '../../Typography';
import { ChipProps } from '../model';
import { Icon } from '../../Icons';
import { Stack } from '../../Stack';
import img from './assets/avatar.jpg';

import chipClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

type ExampleDataType = {
  id: string;
} & Pick<ChipProps, 'view' | 'picture' | 'icon'>;
type ExampleType = {
  type: string;
  data: ExampleDataType[];
};

const chips: ExampleType[] = [
  {
    type: 'default',
    data: [
      {
        id: 'default-with-picture',
        view: 'default',
        picture: img,
      },
      {
        id: 'default-with-icon',
        view: 'default',
        icon: <Icon name="tick" />,
      },
      {
        id: 'default',
        view: 'default',
      },
    ],
  },
  {
    type: 'primary',
    data: [
      {
        id: 'primary-with-picture',
        view: 'primary',
        picture: img,
      },
      {
        id: 'primary-with-icon',
        view: 'primary',
        icon: <Icon name="tick" />,
      },
      {
        id: 'primary',
        view: 'primary',
      },
    ],
  },
  {
    type: 'outline',
    data: [
      {
        id: 'outline-with-picture',
        view: 'outline',
        picture: img,
      },
      {
        id: 'outline-with-icon',
        view: 'outline',
        icon: <Icon name="tick" />,
      },
      {
        id: 'outline',
        view: 'outline',
      },
    ],
  },
];

export const ChipDocs = () => (
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
      {chipClassNames.chip}
    </Paragraph>

    <br />

    <Paragraph>
      Чип — это компактные элементы, представляющие ввод, атрибут или действие.
    </Paragraph>
    <Paragraph>
      Чипы позволяют пользователям вводить информацию, делать выбор, фильтровать
      содержимое или запускать действия.
    </Paragraph>
    <Paragraph>
      Несмотря на то, что он включен сюда как отдельный компонент, наиболее
      распространенное использование будет в той или иной форме ввода, поэтому
      некоторые продемонстрированные здесь действия не показаны в контексте.
    </Paragraph>

    <Stack direction="column" style={{ margin: '24px 0' }}>
      {chips.map(({ type, data }) => (
        <div key={type}>
          <Stack size={48}>
            {data.map(({ id, view, picture, icon }) => (
              <Chip key={id} view={view} picture={picture} icon={icon} closable>
                Floyd Miles
              </Chip>
            ))}
          </Stack>
        </div>
      ))}
    </Stack>

    <br />
    <br />
    <Primary />
    <Controls />
    <Stories />
  </Unstyled>
);
