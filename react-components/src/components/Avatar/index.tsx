import React, { FC } from 'react';
import classNames from 'classnames';

import { AvatarProps, ShapeType } from './model';
import { Picture } from './Picture';

import s from './style.module.scss';
import { avatarBgMap } from './model/avatarBg';

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
  const bgVariantsLength = Object.keys(avatarBgMap).length;
  let firstLetter = name.toUpperCase().charCodeAt(0) - 65;
  let secondLetter = name.toUpperCase().charCodeAt(1) - 65;

  console.log(firstLetter);
  console.log(secondLetter);

  if (firstLetter < 0) {
    firstLetter = 0;
  } else if (firstLetter > 26) {
    firstLetter = 26;
  }

  if (secondLetter < 0) {
    secondLetter = 0;
  } else if (secondLetter > 26) {
    secondLetter = 26;
  }

  console.log(firstLetter);
  console.log(secondLetter);
  console.log('currentIndex', firstLetter * secondLetter);
  console.log('maxIndex', 26 * 26);
  console.log('step', Math.round((26 * 26) / bgVariantsLength));
  console.log(
    'step',
    Math.round(
      (firstLetter * secondLetter) / Math.round((26 * 26) / bgVariantsLength),
    ),
  );
  console.log('________________________');

  return (
    <div
      className={classNames(s.avatar, shapeClasses[shape], className)}
      style={{ ...style, width: `${size}px` }}
    >
      {picture ? (
        <Picture picture={picture} alt={alt} srcSet={srcSet} />
      ) : (
        <div className={s.name}>
          <span>{name}</span>
        </div>
      )}
    </div>
  );
};
