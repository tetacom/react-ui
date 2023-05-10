import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Tabs } from '../index';
import { Typography } from '../../Typography';

import s from './style.module.scss';
import tabsClassNames from '../style.module.scss';

const { Title, Paragraph, Text } = Typography;

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

        <Title level={2} fontVariant="h6">
          Как использовать
        </Title>
        <Paragraph>Основные правила применения табов:</Paragraph>
        <ul>
          <Text>
            <li>
              Не использовать табы для переключения состояний. Для таких
              моментов лучше использовать радиокнопки и тоглы (ссылки);
            </li>
          </Text>
          <Text>
            <li>
              Не используйте табы для основной навигации. Для этого подойдет
              панель навигации или группа выбора;
            </li>
          </Text>
          <Text>
            <li>Лучше всего подойдет для второстепенной навигации;</li>
          </Text>
          <Text>
            <li>Разделяйте табы и контент, чтобы информация лучше читалась.</li>
          </Text>
        </ul>

        <Title level={2} fontVariant="h6">
          Виды табов
        </Title>
        <Paragraph>
          В системе существуют всего 2 вида табов — это горизонтальные и
          вертикальные.
        </Paragraph>

        <div className={s.example}>
          <div>
            <Paragraph fontVariant="captionSemi">Horizontal</Paragraph>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: 'Это просто таб',
                },
              ]}
            />
          </div>
          <div>
            <Paragraph fontVariant="captionSemi">Vertical</Paragraph>
            <Tabs
              defaultActiveKey="1"
              direction="vertical"
              items={[
                {
                  key: '1',
                  label: 'Это просто таб',
                },
              ]}
            />
          </div>
        </div>

        <Title level={2} fontVariant="h6">
          Состояния табов
        </Title>
        <Paragraph>В библиотеке существует 5 состояний:</Paragraph>
        <ol>
          <Text>
            <li>Rest (покой)</li>
          </Text>
          <Text>
            <li>Select (выбор)</li>
          </Text>
          <Text>
            <li>Hover (наведение)</li>
          </Text>
          <Text>
            <li>Disable (недоступно)</li>
          </Text>
        </ol>

        <div className={s.example}>
          <div>
            <Paragraph fontVariant="captionSemi">Rest</Paragraph>
            <Tabs
              items={[
                {
                  key: '1',
                  label: 'Это просто таб',
                },
              ]}
            />
          </div>
          <div>
            <Paragraph fontVariant="captionSemi">Select</Paragraph>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: 'Это просто таб',
                },
              ]}
            />
          </div>
          <div>
            <Paragraph fontVariant="captionSemi">Hover me</Paragraph>
            <Tabs
              items={[
                {
                  key: '1',
                  label: 'Это просто таб',
                },
              ]}
            />
          </div>
          <div>
            <Paragraph fontVariant="captionSemi">Disabled</Paragraph>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: 'Это просто таб',
                  disabled: true,
                },
              ]}
            />
          </div>
        </div>

        <br />
        <br />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <Stories />
      </div>
    </Unstyled>
  );
};
