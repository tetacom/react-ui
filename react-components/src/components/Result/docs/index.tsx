import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Result } from '../index';
import { Typography } from '../../Typography';
import { Icon } from '../../Icons';
import { Button } from '../../Button';

import resultClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const ResultDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Результат
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {resultClassNames.result}
    </Paragraph>

    <br />

    <Paragraph>
      Используется для обратной связи с результатами ряда оперативных задач.
    </Paragraph>

    <Title level={2} fontVariant="h6">
      Как использовать
    </Title>
    <Paragraph>
      Используйте, когда важные операции должны информировать пользователя об
      обработке результатов, а обратная связь более сложна.
    </Paragraph>

    <Result
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      icon={
        <Icon name="checkCircle" size={64} color="var(--color-primary-50)" />
      }
      extra={[
        <Button key="back">Go Back</Button>,
        <Button key="buy" view="outline">
          Buy Again
        </Button>,
      ]}
    />

    <br />
    <br />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </Unstyled>
);
