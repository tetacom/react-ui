import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Spinner } from '../index';
import { Typography } from '../../Typography';
import { Button } from '../../Button';
import { ButtonProps } from '../../Button/model';
import { Icon } from '../../Icons';
import { Stack } from '../../Stack';

import s from './style.module.scss';
import spinnerClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

const exampleButtons: (Pick<ButtonProps, 'view' | 'square'> & {
  id: string;
})[] = [
  {
    id: '1',
    view: 'primary',
    square: false,
  },
  {
    id: '2',
    view: 'outline',
    square: false,
  },
  {
    id: '3',
    view: 'ghost',
    square: false,
  },
  {
    id: '4',
    view: 'primary',
    square: true,
  },
  {
    id: '5',
    view: 'outline',
    square: true,
  },
  {
    id: '6',
    view: 'ghost',
    square: true,
  },
];

export const SpinnerDocs = () => (
  <Unstyled>
    <div className={s.root}>
      <Title
        level={1}
        fontVariant="h4"
        style={{
          marginBottom: 0,
        }}
      >
        Спиннер
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {spinnerClassNames.spinner}
      </Paragraph>

      <br />

      <Paragraph>
        Spinner (спинер) — это зацикленный индикатор, не отображающий прогресс
        выполнения задачи.
      </Paragraph>

      <Title level={2} fontVariant="h6">
        Как использовать
      </Title>
      <Paragraph>
        Не показывайте на странице сразу несколько спиннеров, даже если они
        иллюстрируют не связанные процессы. Это создает неприятное мельтешение и
        излишне акцентирует внимание пользователя на процессе загрузки. Как
        правило, есть другой способ показать процесс загрузки.
      </Paragraph>
      <Paragraph>Чаще всего применяется на кнопках.</Paragraph>

      <Stack size={32} className={s.exampleBlock}>
        {[
          'var(--color-primary-50)',
          'var(--color-text-30)',
          'var(--color-global-white)',
        ].map((spin) => (
          <div key={spin}>
            <Spinner color={spin} size={32} />
          </div>
        ))}
      </Stack>

      <Title level={2} fontVariant="h4">
        Принцип работы
      </Title>

      <Stack size={96} wrap style={{ margin: '24px 0' }}>
        {exampleButtons.map(({ id, view, square }) => (
          <div key={id}>
            <Button size="large" view={view} square={square} loading>
              Загрузить
              <Icon name="user" />
            </Button>
          </div>
        ))}
      </Stack>

      <br />
      <br />
      <Primary />
      <Controls />
      <Stories />
    </div>
  </Unstyled>
);
