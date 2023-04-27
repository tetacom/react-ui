import React from 'react';
import {
  ArgsTable,
  Primary,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { Unstyled } from '@storybook/blocks';

import { Checkbox } from '../index';
import { Typography } from '../../Typography';

import checkboxClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const CheckboxDocs = () => (
  <Unstyled>
    <Title
      level={1}
      fontVariant="h4"
      style={{
        marginBottom: 0,
      }}
    >
      Чекбоксы
    </Title>
    <Paragraph
      fontVariant="caption"
      style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
    >
      {checkboxClassNames.checkbox}
    </Paragraph>

    <br />

    <Paragraph>
      Checkbox (чекбокс) — компонент, который позволяет пользователю выбрать
      опцию и может находится в состояниях «выбран» (True) и «не выбран»
      (False).
    </Paragraph>

    <Checkbox>Remember me</Checkbox>

    <br />
    <br />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </Unstyled>
);
