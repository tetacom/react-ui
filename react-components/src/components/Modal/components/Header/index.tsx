import React, { FC } from 'react';

import { Button } from '../../../Button';
import { Icon } from '../../../Icons';
import { Typography } from '../../../Typography';
import { ModalProps } from '../../model';

import s from './style.module.scss';

type Props = Pick<ModalProps, 'title' | 'onCancel'>;

export const Header: FC<Props> = ({ title = '', onCancel }) => {
  if (!title) return null;

  return (
    <div className={s.header}>
      <Typography.Title
        level={4}
        fontVariant="title2"
        resetMargin
        className={s.title}
      >
        {title}
      </Typography.Title>
      <Button shape="circle" square view="ghost" onClick={onCancel}>
        <Icon name="closeBig" />
      </Button>
    </div>
  );
};
