import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

// import { Drawer } from '../index';
import { Typography } from '../../Typography';

import drawerClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const DrawerDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Боковая панель
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {drawerClassNames.drawerContent}
    </Paragraph>
    <br />
    <Paragraph>Панель, которая выдвигается от края экрана.</Paragraph>
    <Title level={2} fontVariant="h6">
      Когда использовать
    </Title>
    <Paragraph>
      Боковая панель — это панель, которая обычно накладывается поверх страницы
      и выдвигается сбоку. Она содержит набор информации или действий. Поскольку
      пользователь может взаимодействовать с боковой панелью, не покидая текущую
      страницу, задачи можно выполнять более эффективно в том же контексте.
    </Paragraph>
    <ul>
      <Text>
        <li>
          Используйте форму для создания или редактирования набора информации.
        </li>
      </Text>
      <Text>
        <li>
          Обработка подзадач. Когда подзадачи слишком тяжелы для всплывающего
          окна, и мы все еще хотим сохранить подзадачи в контексте основной
          задачи, боковая панель оказывается очень удобным.
        </li>
      </Text>
      <Text>
        <li>Когда одна и та же форма требуется в нескольких местах.</li>
      </Text>
    </ul>

    <div style={{ border: '3px dashed red' }}>123</div>

    <br />
    <br />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </Unstyled>
);
