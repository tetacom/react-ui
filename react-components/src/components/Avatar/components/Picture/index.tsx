import React, { FC } from 'react';

import { AvatarProps } from '../../model';

interface Props {
  picture: AvatarProps['picture'];
  alt: AvatarProps['alt'];
  srcSet: AvatarProps['srcSet'];
}

export const Picture: FC<Props> = ({ picture, alt = '', srcSet }) => {
  if (!picture) {
    return null;
  }

  if (typeof picture === 'string') {
    return <img src={picture} srcSet={srcSet} alt={alt} />;
  }

  return picture;
};
