import React, { FC } from 'react';
import classNames from 'classnames';

import { ResultProps } from './model';
import { Typography } from '../Typography';
import { Stack } from '../Stack';

import s from './style.module.scss';

const { Title, Paragraph } = Typography;

export const Result: FC<ResultProps> = ({
  title,
  subTitle,
  picture = null,
  icon = null,
  extra = [],
  className = '',
  style,
}) => {
  const hasImage = picture || icon;

  return (
    <Stack
      direction="column"
      size={24}
      justifyContent="center"
      align="center"
      className={classNames(s.result, className)}
      style={style}
    >
      {hasImage && <div className={s.picture}>{picture || icon}</div>}

      {(title || subTitle) && (
        <Stack size={16} direction="column">
          {title && (
            <Title level={6} className={s.title}>
              {title}
            </Title>
          )}

          {subTitle && <Paragraph className={s.subtitle}>{subTitle}</Paragraph>}
        </Stack>
      )}

      {Boolean(extra.length) && <Stack size={16}>{extra}</Stack>}
    </Stack>
  );
};
