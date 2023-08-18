import React, { FC, PropsWithChildren } from 'react';

import { Typography } from '../../../../Typography';

import s from './style.module.scss';

export const TextContent: FC<PropsWithChildren> = ({ children }) => (
  <Typography.Text fontVariant="overline" className={s.root}>
    {children}
  </Typography.Text>
);
