import React, { FC } from 'react';

import { AvatarProps, SizeType } from '../../model';
import { FontVariant } from '../../../Typography/model';
import { Typography } from 'tetacom/react-components';
import { getBgHex } from './getBgHex';
import { getContrastColor } from '../../../../utils/getContrastColor';

import s from './style.module.scss';

const fontSizes: Record<SizeType, FontVariant> = {
  26: 'captionBold',
  28: 'captionBold',
  32: 'captionBold',
  44: 'title2',
  64: 'title1',
  128: 'h5',
  200: 'h4',
};

interface Props {
  name: AvatarProps['name'];
  size: AvatarProps['size'];
}

export const Name: FC<Props> = ({ name, size = '28' }) => {
  const initials =
    name.length <= 2
      ? name.toUpperCase()
      : name
          .split(' ')
          .map((word) => word.substring(0, 1))
          .join('')
          .substring(0, 2)
          .toUpperCase();
  const bgColor = getBgHex(initials);
  const fontVariant: FontVariant = isNumber(size)
    ? 'captionSemi'
    : fontSizes[size];
  const fontSize = isNumber(size)
    ? Math.round(Math.pow(size, 0.675))
    : undefined;

  return (
    <div
      className={s.name}
      style={{ backgroundColor: bgColor, color: getContrastColor(bgColor) }}
    >
      <Typography.Text fontVariant={fontVariant} style={{ fontSize }}>
        {initials}
      </Typography.Text>
    </div>
  );
};

function isNumber(val: AvatarProps['size']): val is number {
  return typeof val === 'number';
}
