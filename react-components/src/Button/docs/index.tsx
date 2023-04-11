import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import classNames from 'classnames';

import { Button, ButtonProps } from '../index';
import { TmpSvgIcon } from '../../tmpSvgIcon';

import s from './style.module.scss';
import buttonClassNames from '../style.module.scss';

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
      <h4
        style={{
          marginBottom: 0,
        }}
      >
        Кнопка
      </h4>
      <p className={classNames(s.caption, 'color-primary-50')}>
        {buttonClassNames.button}
      </p>

      <br />

      <p>
        Button (кнопка) — компонент, который призывает пользователя к совершению
        определенного действия в интерфейсе, например: открыть следующую
        страницу, заказать товар или войти в свой аккаунт.
      </p>
      <p>
        Основной призыв к действию. Предназначены для выполнения какого-либо
        действия в системе.
      </p>

      <h6>Как использовать</h6>
      <p>Основные правила применения кнопки:</p>
      <ul>
        <li>Текст кнопки всегда должен быть с заглавной буквы;</li>
        <li>
          Текст на кнопке должен сообщать пользователю, что произойдёт, если он
          нажмёт на кнопку (например, Сохранить, Добавить и т. п.);
        </li>
        <li>
          Не перенасыщать страницу большим количеством Primary кнопок. Не
          распологать их рядом друг с другом.
        </li>
      </ul>

      <h6>Типы кнопок</h6>
      <p>
        В системе существуют всего 6 типов кнопок — это Primary (основная),
        Secondary (второстепенная) и Ghost (без фона), Primary Icon, Secondary
        Icon, Ghost Icon кнопки
      </p>
      <div className={s.exampleBlock}>
        {buttonTypes.map(({ key, title, view, square }) => (
          <div key={key}>
            <span>{title}</span>
            <Button view={view} square={square} icons={[<TmpSvgIcon />]}>
              Загрузить
            </Button>
          </div>
        ))}
      </div>

      <h6>Состояния кнопок</h6>
      <p>Есть 5 состояний каждой кнопки:</p>
      <ol>
        <li>Rest (покой)</li>
        <li>Hover (наведение)</li>
        <li>Press (нажатие)</li>
        <li>Disable (недоступно)</li>
        <li>Focus (в фокусе)</li>
      </ol>
      <div className={s.exampleBlock}>
        {buttonStates.map(({ key, title, disabled }) => (
          <div key={key}>
            <span>{title}</span>
            <Button disabled={disabled} icons={[<TmpSvgIcon />]}>
              Загрузить
            </Button>
          </div>
        ))}
      </div>

      <h6>Размер кнопок</h6>
      <p>
        Есть 3 размера кнопок — S, M и L. В основном в проектах используются
        кнопки размера M
      </p>
      <div className={s.exampleBlock}>
        {buttonSizes.map(({ key, title, size }) => (
          <div key={key}>
            <span>{title}</span>
            <Button size={size} icons={[<TmpSvgIcon />]}>
              Загрузить
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
