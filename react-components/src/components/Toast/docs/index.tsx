import React, { useState } from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Toast } from '../index';
import { Typography } from '../../Typography';
import { Stack } from '../../Stack';

import toastClassNames from '../style.module.scss';
import { Button } from '../../Button';
import { Icon } from '../../Icons';


import { ToastStateType } from '../model';
import { PaletteType } from '../../Button/model/public-api';

const { Title, Paragraph } = Typography;

const toasts: {
  key: string;
  buttonType: PaletteType;
  toastType: ToastStateType;
}[] = [
  {
    key: 'default',
    buttonType: 'none',
    toastType: 'default',
  },
  {
    key: 'success',
    buttonType: 'green',
    toastType: 'success',
  },
  {
    key: 'warning',
    buttonType: 'yellow',
    toastType: 'warning',
  },
  {
    key: 'error',
    buttonType: 'red',
    toastType: 'error',
  },
];

export const ToastDocs = () => {
  const [toastState, setToastState] = useState<ToastStateType>('default');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (state: ToastStateType) => {
    setToastState(state);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Unstyled>
      <Title
        level={1}
        fontVariant="h4"
        style={{
          marginBottom: 0,
        }}
      >
        Тост
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {toastClassNames.toast}
      </Paragraph>

      <br />

      <Paragraph>
        Toast (тост) — короткое немодальное уведомление, которое сообщает
        пользователю о результате выполнения его команды.
      </Paragraph>

      <Title level={2} fontVariant="h6">
        Как использовать
      </Title>
      <Paragraph>
        Используйте тост, если нет возможности сообщить обратную связь. В
        проектах выпрыгивает из правого нижнего угла.
      </Paragraph>
      <Paragraph>
        Тост показывается несколько секунд, после чего исчезает. Этот компонент
        так же может содержать кнопки, чтобы закрыть или же перейти к объекту, к
        которому применима обратная связь.
      </Paragraph>

      <Title level={2} fontVariant="h6">
        Виды тостов
      </Title>
      <Paragraph>
        Есть несколько видов тостов. Они различаются своими State Lines.
      </Paragraph>

      <Stack size={24} style={{ margin: '24px 0' }}>
        {toasts.map(({ key, buttonType, toastType }) => (
          <Button
            key={key}
            size="large"
            palette={buttonType}
            onClick={() => {
              handleOpen(toastType);
            }}
          >
            Открыть тост
          </Button>
        ))}
      </Stack>

      <Toast
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={1000}
        title="Здесь некий текст, получается"
        state={toastState}
        extra={[
          <Button key="1">
            <Icon name="3dView" />
            Он не понимает
          </Button>,
          <Button key="2">
            <Icon name="questionFilled" />Я не понимаю
          </Button>,
        ]}
      >
        <Typography.Paragraph fontVariant="body3" resetMargin>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </Typography.Paragraph>
      </Toast>

      <br />
      <br />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </Unstyled>
  );
};
