import React, { FC } from 'react';

import { AvatarProps } from '../../model';
import { getBgHex } from './getBgHex';

import s from './style.module.scss';

interface Props {
  name: AvatarProps['name'];
}

export const Name: FC<Props> = ({ name }) => {
  const initials =
    name.length <= 2
      ? name.toUpperCase()
      : name
          .split(' ')
          .map((word) => word.substring(0, 1))
          .join('')
          .substring(0, 2)
          .toUpperCase();

  return (
    <div className={s.name} style={{ backgroundColor: getBgHex(initials) }}>
      <span>{initials}</span>
    </div>
  );
};
