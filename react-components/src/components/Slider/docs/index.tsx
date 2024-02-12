import React, { useState } from 'react';
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
import { Drawer } from '../../Drawer';
import { Button } from '../../Button';

const { Title, Paragraph } = Typography;

export const SliderDocs = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
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

      <Slider
        min={0}
        max={100}
        step={1}
        values={[{ key: 'point', value: 50 }]}
      />

      <br />
      <br />

      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open drawer
      </Button>
      <Drawer
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        width={300}
        zIndex={1}
        renderAfterAnimationComplete
      >
        <Typography.Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
          officia, voluptatum. Deleniti dolorem, facere harum iusto nesciunt
          placeat totam? A deleniti dolorum facere incidunt laudantium natus
          nihil odio ullam ut!
        </Typography.Paragraph>

        <Slider
          min={0}
          max={100}
          step={1}
          values={[{ key: 'point', value: 0 }]}
        />
      </Drawer>

      <br />
      <br />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </Unstyled>
  );
};
