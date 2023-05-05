import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Typography } from '../../Typography';

import s from './style.module.scss';
import tabsClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const TabsDocs = () => {
  return (
    <Unstyled>
      <div className={s.root}>
        <Title
          level={1}
          fontVariant="h4"
          style={{
            marginBottom: 0,
          }}
        >
          Таб
        </Title>
        <Paragraph
          fontVariant="caption"
          style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
        >
          {tabsClassNames.tabs}
        </Paragraph>

        <br />

        <Paragraph>
          Tab (таб) — компонент, который переключают вкладки на странице.
          Активный таб выделен цветом и помечен специальным маркером —
          горизонтальной или вертикальной линией.
        </Paragraph>
        <Paragraph>Табы группируют контент и помогают в навигации.</Paragraph>

        {/*<Title level={2} fontVariant="h6">*/}
        {/*  Как использовать*/}
        {/*</Title>*/}
        {/*<Paragraph>*/}
        {/*  Не показывайте на странице сразу несколько спиннеров, даже если они*/}
        {/*  иллюстрируют не связанные процессы. Это создает неприятное мельтешение*/}
        {/*  и излишне акцентирует внимание пользователя на процессе загрузки. Как*/}
        {/*  правило, есть другой способ показать процесс загрузки.*/}
        {/*</Paragraph>*/}
        {/*<Paragraph>Чаще всего применяется на кнопках.</Paragraph>*/}

        <br />
        <br />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <Stories />
      </div>
    </Unstyled>
  );
};
