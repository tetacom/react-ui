import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from '../index';
import { RadioValueType } from '../model/public-api';
import { RadioDocs } from '../docs';

const meta: Meta<typeof Radio> = {
  title: 'Data Entry/Radio',
  component: Radio,
  parameters: {
    docs: {
      page: RadioDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Radio>;
type GroupStory = StoryObj<typeof Radio.Group>;

const RadioWithHooks = () => {
  const [value, setValue] = useState<RadioValueType>(1);
  const handleOnChange = (event: RadioValueType) => {
    setValue(event);
  };

  return (
    <div>
      <Radio.Group value={value} onChange={handleOnChange}>
        <Radio value={1}>Radio Button 1</Radio>
        <Radio value={2}>Radio Button 2</Radio>
        <Radio value={3}>Radio Button 3</Radio>
      </Radio.Group>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: 'Radio Button',
    checked: false,
    disabled: false,
  },
};

export const RadioGroup: GroupStory = {
  render: () => <RadioWithHooks />,
};
