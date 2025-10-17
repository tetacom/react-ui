import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Typography } from '../../Typography';

import modalClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

export const ModalDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Модальное окно
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {modalClassNames.modal}
    </Paragraph>

    <br />

    <Paragraph>
      Modal Window или Pop Up (модальное окно) — это эмуляция диалогового окна
      браузера, появляющегося поверх страницы в ответ на действия пользователя и
      блокирующего доступ к основному содержимому страницы.
    </Paragraph>

    <Title level={2} fontVariant="h6">
      Как использовать
    </Title>

    <Paragraph>
      Используйте модальное окно для второстепенного содержимого страниц,
      которое требуется только в некоторых случаях, или для того, чтобы
      сосредоточить внимание пользователя на совершаемом действии. Как правило,
      это настройки, создание новых документов, заполнение небольших форм.
    </Paragraph>
    <Paragraph>
      Не используйте модальное окно для больших форм. Большие формы — это формы
      которые не помещаются в два экрана монитора.
    </Paragraph>
    <Paragraph>
      Чтобы воспользоваться этим компонентом достаточно соблюдать некоторые
      правила:
    </Paragraph>
    <ul>
      <Text>
        <li>В модальном окне используется стандартная шапка в 52px;</li>
      </Text>
      <Text>
        <li>Описание должно быть простым и понятным пользователю;</li>
      </Text>
    </ul>
    <Paragraph>Разрешено использовать свои вариации модальных окон.</Paragraph>

    <br />
    <br />
    <Primary />
    <Controls />
    <Stories />
  </Unstyled>
);
