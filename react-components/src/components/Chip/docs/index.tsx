import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Chip } from '../index';
import { Typography } from '../../Typography';
import { ChipProps } from '../model';
import { Icon } from '../../Icons';
import img from './assets/avatar.jpg';

import s from './style.module.scss';
import chipClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

type ExampleType = {
  id: string;
} & Pick<ChipProps, 'view' | 'picture' | 'icon'>;

const chips: ExampleType[] = [
  {
    id: 'default-with-picture',
    view: 'default',
    picture: <img src={img} alt="" />,
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

  {
    id: 'primary-with-picture',
    view: 'primary',
    picture: <img src={img} alt="" />,
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

  {
    id: 'outline-with-picture',
    view: 'outline',
    picture: <img src={img} alt="" />,
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
];

export const ChipDocs = () => {
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
          Чип — это компактные элементы, представляющие ввод, атрибут или
          действие.
        </Paragraph>
        <Paragraph>
          Чипы позволяют пользователям вводить информацию, делать выбор,
          фильтровать содержимое или запускать действия.
        </Paragraph>
        <Paragraph>
          Несмотря на то, что он включен сюда как отдельный компонент, наиболее
          распространенное использование будет в той или иной форме ввода,
          поэтому некоторые продемонстрированные здесь действия не показаны в
          контексте.
        </Paragraph>

        <div className={s.exampleBlock}>
          {chips.map(({ id, view, picture, icon }) => (
            <div key={id}>
              <Chip view={view} picture={picture} icon={icon} closable>
                Floyd Miles
              </Chip>
            </div>
          ))}
        </div>

        <br />
        <br />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <Stories />
      </div>
    </Unstyled>
  );
};
