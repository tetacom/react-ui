import React, { useState } from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';
import { Placement } from '@floating-ui/react';

import { Tooltip } from '../index';
import { Typography } from '../../Typography';
import { Button } from '../../Button';
import { Radio } from 'tetacom/react-components';

import s from './style.module.scss';
import tooltipClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

const placements: {
  type: 'placement' | 'empty' | 'tooltip';
  id: string;
  label?: string;
}[] = [
  {
    type: 'empty',
    id: 'top-left',
  },
  {
    type: 'placement',
    id: 'top-start',
    label: 'Top Start',
  },
  {
    type: 'placement',
    id: 'top-center',
    label: 'Top Center',
  },
  {
    type: 'placement',
    id: 'top-end',
    label: 'Top End',
  },
  {
    type: 'empty',
    id: 'top-right',
  },
  {
    type: 'placement',
    id: 'left-start',
    label: 'Left Start',
  },
  {
    type: 'tooltip',
    id: 'tooltip',
  },
  {
    type: 'placement',
    id: 'right-start',
    label: 'Right Start',
  },
  {
    type: 'placement',
    id: 'left-center',
    label: 'Left Center',
  },
  {
    type: 'placement',
    id: 'right-center',
    label: 'Right Center',
  },
  {
    type: 'placement',
    id: 'left-end',
    label: 'Left End',
  },
  {
    type: 'placement',
    id: 'right-end',
    label: 'Right End',
  },
  {
    type: 'empty',
    id: 'bottom-left',
  },
  {
    type: 'placement',
    id: 'bottom-start',
    label: 'Bottom Start',
  },
  {
    type: 'placement',
    id: 'bottom-center',
    label: 'Bottom Center',
  },
  {
    type: 'placement',
    id: 'bottom-end',
    label: 'Bottom End',
  },
  {
    type: 'empty',
    id: 'bottom-right',
  },
];

export const TooltipDocs = () => {
  const [selectedPlacement, setSelectedPlacement] = useState('top-start');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlacement(event.target.value);
  };

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
          Всплывающее окно
        </Title>
        <Paragraph
          fontVariant="caption"
          style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
        >
          {tooltipClassNames.tooltip}
        </Paragraph>

        <br />

        <Paragraph>
          Tooltip (всплывающее окно) — это компонент для отображения
          всплывающего окна возле элемента или определённой точки на экране.
        </Paragraph>

        <Title level={2} fontVariant="h6">
          Как использовать
        </Title>
        <Paragraph>
          Тултип используется для коротких поясняющих текстов, если необходимо
          дать разъяснение к деталям интерфейса, упомянутой информации или
          помочь с заполнением полей. Если эти подробности не нужны постоянно,
          но могут помочь пользователю в момент когда он испытывает трудности.
        </Paragraph>
        <Paragraph>
          Если пояснение содержит много информации, то полезнее разместить его в
          виде статьи на отдельную страницу, а в тултип добавить ссылку.
        </Paragraph>

        <div className={s.dashboard}>
          {placements.map(({ type, id, label }) => {
            const checked = selectedPlacement === id;

            if (type === 'empty') return <div key={id} />;

            if (type === 'tooltip') {
              return (
                <div key={id} className={s.tooltip}>
                  <Tooltip
                    target="hover"
                    title="Это поле не может содержать значение меньше 0,1, потому что это не поле, а кнопка"
                    placement={selectedPlacement as Placement}
                  >
                    <Button size="large">Move cursor here</Button>
                  </Tooltip>
                </div>
              );
            }

            return (
              <div key={id} className={s.tile}>
                <Radio value={id} checked={checked} onChange={handleChange}>
                  {label}
                </Radio>
              </div>
            );
          })}
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
