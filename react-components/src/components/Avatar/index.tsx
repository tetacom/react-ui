import React, { FC } from 'react';
import classNames from 'classnames';

import { AvatarProps, ShapeType } from './model';
import { Picture } from './components/Picture';
import { Name } from './components/Name';
import { rusToLat } from '../../utils/rusToLat';

import s from './style.module.scss';

const shapeClasses: Record<ShapeType, string> = {
  circle: s.avatarShapeCircle,
  round: s.avatarShapeRound,
  brick: s.avatarShapeBrick,
};

export const Avatar: FC<AvatarProps> = ({
  name,
  picture = '',
  alt = '',
  srcSet = '',
  shape = 'circle',
  size = '28',
  className = '',
  style,
}) => {
  const latName = rusToLat(name);

  return (
    <div
      className={classNames(s.avatar, shapeClasses[shape], className)}
      style={{ ...style, width: `${size}px` }}
    >
      {picture ? (
        <Picture picture={picture} alt={alt} srcSet={srcSet} />
      ) : (
        <Name name={latName} size={size} />
      )}
    </div>
  );
};
