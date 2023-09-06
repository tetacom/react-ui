import React, { FC } from 'react';

import { Button } from '../../../Button';
import { Stack } from '../../../Stack';
import { ModalProps } from '../../model';

import s from './style.module.scss';

const Wrapper: FC<React.PropsWithChildren> = ({ children }) => (
  <Stack size={8} justifyContent="flex-end" block className={s.footer}>
    {children}
  </Stack>
);

type Props = Pick<
  ModalProps,
  'footer' | 'onOk' | 'okText' | 'onCancel' | 'cancelText'
>;

export const Footer: FC<Props> = ({
  footer,
  onOk,
  okText,
  onCancel,
  cancelText,
}) => {
  if (!footer) return null;

  if (Array.isArray(footer)) return <Wrapper>{footer}</Wrapper>;

  return (
    <Wrapper>
      <Button view="ghost" onClick={onCancel}>
        {cancelText || 'Отмена'}
      </Button>
      <Button onClick={onOk}>{okText || 'Ok'}</Button>
    </Wrapper>
  );
};
