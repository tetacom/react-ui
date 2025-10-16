import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Badge } from '../index';
import { Typography } from '../../Typography';
import { PaletteType, ViewType } from '../model';

import badgeClassNames from '../style.module.scss';
import s from './style.module.scss';

const { Title, Paragraph, Text } = Typography;

const badgeVariants: { id: string; view: ViewType; palette: PaletteType }[] =
  [];
(['primary', 'green', 'yellow', 'red', 'text'] as PaletteType[]).forEach(
  (palette, paletteIndex) => {
    (['stroke', 'fill'] as ViewType[]).forEach((view, viewIndex) => {
      badgeVariants.push({ id: `${paletteIndex}${viewIndex}`, view, palette });
    });
  },
);

export const BadgeDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Badge
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {badgeClassNames.badge}
    </Paragraph>

    <br />

    <Paragraph>
      Badge — показывает статус объекта, например, им можно показать разные
      этапы какого-то процесса:
    </Paragraph>
    <ul>
      <Text>
        <li>Запланированно</li>
      </Text>
      <Text>
        <li>В работе</li>
      </Text>
      <Text>
        <li>Завершено</li>
      </Text>
    </ul>
    <Paragraph>
      У Badge есть 2 варианта отображения - обводка и заливка.
    </Paragraph>

    <div className={s.badges}>
      {badgeVariants.map(({ id, view, palette }) => (
        <Badge key={id} view={view} palette={palette}>
          Label
        </Badge>
      ))}
    </div>

    <br />
    <br />
    <Primary />
    <Controls />
    <Stories />
  </Unstyled>
);
