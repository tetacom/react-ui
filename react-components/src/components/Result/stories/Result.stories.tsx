import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Result } from '../index';
import stubImg from '../docs/assets/stub.png';
import notFoundImg from '../docs/assets/404.png';
import { Button } from '../../Button';
import { ResultDocs } from '../docs';

const meta: Meta<typeof Result> = {
  title: 'Feedback/Result',
  component: Result,
  parameters: {
    docs: {
      page: ResultDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Result>;

export const Default: Story = {
  args: {
    title: 'Вы еще не загрузили исходные данные',
    subTitle: 'Загрузите файл с данными в формате .xls или .xlsx',
    picture: <img src={stubImg} alt="stubImg" />,
    extra: [
      <Button key="import" shape="circle">
        Импорт
      </Button>,
      <Button key="cancel" shape="circle" view="outline">
        Отмена
      </Button>,
    ],
    style: { minHeight: 'calc(100vh - 16px)' },
  },
};

export const PageNotFound: Story = {
  args: {
    subTitle:
      'Такой страницы не существует. Проверьте правильность написания адреса или перейдите на главную',
    picture: <img src={notFoundImg} alt="stubImg" />,
    extra: [<Button key="back">На главную</Button>],
    style: { minHeight: 'calc(100vh - 16px)' },
  },
};
