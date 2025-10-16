import React from 'react';
import { Primary, Stories } from '@storybook/addon-docs';
import { Unstyled, Controls } from '@storybook/blocks';

import { Dropdown } from '../index';
import { Typography } from '../../Typography';
import { Button } from '../../Button';
import { DropdownList } from './list';

import s from './style.module.scss';
import dropdownClassNames from '../style.module.scss';

const { Title, Paragraph } = Typography;

export const DropdownDocs = () => {
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
          Выпадающее окно
        </Title>
        <Paragraph
          fontVariant="caption"
          style={{ marginTop: 0, color: 'var(--color-primary-50)' }}
        >
          {dropdownClassNames.dropdownTrigger}
        </Paragraph>

        <br />

        <div className={s.example}>
          <div className={s.exampleContent}>
            <Dropdown dropdown={<DropdownList />}>
              <Button size="large">Click me</Button>
            </Dropdown>
          </div>
          <div className={s.canvas} />
        </div>

        <br />
        <br />
        <Primary />
        <Controls />
        <Stories />
      </div>
    </Unstyled>
  );
};
