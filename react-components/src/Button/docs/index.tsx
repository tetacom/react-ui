import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import { Button, ButtonProps } from '../index';
import { Typography } from '../../Typography';

import s from './style.module.scss';
import buttonClassNames from '../style.module.scss';
import { Icon } from '../../Icons';

const { Title, Paragraph, Text } = Typography;

interface BaseType {
  key: string;
  title: string;
}

const buttonTypes: (BaseType & Pick<ButtonProps, 'view' | 'square'>)[] = [
  {
    key: 'primary',
    title: 'Primary',
    view: 'primary',
    square: false,
  },
  {
    key: 'secondary',
    title: 'Secondary',
    view: 'outline',
    square: false,
  },
  {
    key: 'ghost',
    title: 'Ghost',
    view: 'ghost',
    square: false,
  },
  {
    key: 'primary-icon',
    title: 'Primary Icon',
    view: 'primary',
    square: true,
  },
  {
    key: 'secondary-icon',
    title: 'Secondary Icon',
    view: 'outline',
    square: true,
  },
  {
    key: 'ghost-icon',
    title: 'Ghost Icon',
    view: 'ghost',
    square: true,
  },
];
const buttonStates: (BaseType & Pick<ButtonProps, 'disabled'>)[] = [
  {
    key: 'rest',
    title: 'Rest',
    disabled: false,
  },
  {
    key: 'hover',
    title: 'Hover here',
    disabled: false,
  },
  {
    key: 'press',
    title: 'Press here',
    disabled: false,
  },
  {
    key: 'disable',
    title: 'Disable',
    disabled: true,
  },
  {
    key: 'focus',
    title: 'Focus with keyboard',
    disabled: false,
  },
];
const buttonSizes: (BaseType & Pick<ButtonProps, 'size'>)[] = [
  {
    key: 's',
    title: 'S',
    size: 'small',
  },
  {
    key: 'm',
    title: 'M',
    size: 'middle',
  },
  {
    key: 'l',
    title: 'L',
    size: 'large',
  },
];

export const ButtonDocs = () => {
  return (
    <div className={s.root}>
      <Title
        level={4}
        style={{
          marginBottom: 0,
        }}
      >
        Кнопка
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {buttonClassNames.button}
      </Paragraph>

      <br />

      <Paragraph>
        Button (кнопка) — компонент, который призывает пользователя к совершению
        определенного действия в интерфейсе, например: открыть следующую
        страницу, заказать товар или войти в свой аккаунт.
      </Paragraph>
      <Paragraph>
        Основной призыв к действию. Предназначены для выполнения какого-либо
        действия в системе.
      </Paragraph>

      <Title level={6}>Как использовать</Title>
      <Paragraph>Основные правила применения кнопки:</Paragraph>
      <ul>
        <Text>
          <li>Текст кнопки всегда должен быть с заглавной буквы;</li>
        </Text>
        <Text>
          <li>
            Текст на кнопке должен сообщать пользователю, что произойдёт, если
            он нажмёт на кнопку (например, Сохранить, Добавить и т. п.);
          </li>
        </Text>
        <Text>
          <li>
            Не перенасыщать страницу большим количеством Primary кнопок. Не
            распологать их рядом друг с другом.
          </li>
        </Text>
      </ul>

      <Title level={6}>Типы кнопок</Title>
      <Paragraph>
        В системе существуют всего 6 типов кнопок — это Primary (основная),
        Secondary (второстепенная) и Ghost (без фона), Primary Icon, Secondary
        Icon, Ghost Icon кнопки
      </Paragraph>
      <div className={s.exampleBlock}>
        {buttonTypes.map(({ key, title, view, square }) => (
          <div key={key}>
            <Text fontVariant="captionSemi">{title}</Text>
            <Button view={view} square={square}>
              Загрузить <Icon name="user" />
            </Button>
          </div>
        ))}
      </div>

      <Title level={6}>Состояния кнопок</Title>
      <Paragraph>Есть 5 состояний каждой кнопки:</Paragraph>
      <ol>
        <Text>
          <li>Rest (покой)</li>
        </Text>
        <Text>
          <li>Hover (наведение)</li>
        </Text>
        <Text>
          <li>Press (нажатие)</li>
        </Text>
        <Text>
          <li>Disable (недоступно)</li>
        </Text>
        <Text>
          <li>Focus (в фокусе)</li>
        </Text>
      </ol>
      <div className={s.exampleBlock}>
        {buttonStates.map(({ key, title, disabled }) => (
          <div key={key}>
            <Text fontVariant="captionSemi">{title}</Text>
            <Button disabled={disabled}>
              Загрузить <Icon name="user" />
            </Button>
          </div>
        ))}
      </div>

      <Title level={6}>Размер кнопок</Title>
      <Paragraph>
        Есть 3 размера кнопок — S, M и L. В основном в проектах используются
        кнопки размера M
      </Paragraph>
      <div className={s.exampleBlock}>
        {buttonSizes.map(({ key, title, size }) => (
          <div key={key}>
            <Text fontVariant="captionSemi">{title}</Text>
            <Button size={size}>
              Загрузить <Icon name="user" color="white" />
            </Button>
          </div>
        ))}
      </div>

      <br />
      <br />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </div>
  );
};
