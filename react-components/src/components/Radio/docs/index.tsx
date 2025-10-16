import React, { useState } from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Radio } from '../index';
import { Typography } from '../../Typography';

import radioClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const RadioDocs = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Unstyled>
      <Title
        level={1}
        fontVariant="h4"
        style={{
          marginBottom: 0,
        }}
      >
        Переключатель
      </Title>
      <Paragraph
        fontVariant="caption"
        style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
      >
        {radioClassNames.radio}
      </Paragraph>

      <br />

      <Paragraph>
        Radiobutton (переключатель) — компонент, который используется для выбора
        одного значения из нескольких.
      </Paragraph>

      <Radio checked={checked} onChange={() => setChecked(!checked)}>
        Option 1
      </Radio>

      <br />
      <br />
      <Primary />
      <Controls />
      <Stories />
    </Unstyled>
  );
};
