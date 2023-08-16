import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Slider } from '../index';
import { Typography } from '../../Typography';

import sliderClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const SliderDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Слайдер
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {sliderClassNames.slider}
    </Paragraph>

    <br />

    <Paragraph>
      Компонент слайдер используется для отображения текущего значения и
      интервалов в диапазоне.
    </Paragraph>

    <Title level={2} fontVariant="h6">
      Когда использовать
    </Title>
    <Paragraph>Чтобы показать значение в диапазоне.</Paragraph>

    <br />

    <Slider min={0} max={100} step={1} values={[{ key: 'point', value: 50 }]} />

    <br />
    <br />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </Unstyled>
);
