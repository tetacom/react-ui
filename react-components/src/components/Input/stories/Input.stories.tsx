import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../index';
import { InputDocs } from '../docs';
import { Icon } from '../../Icons';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Data Entry/Input',
  component: Input,
  argTypes: { onChange: { action: 'changed' } },
  parameters: {
    docs: {
      page: InputDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    defaultValue: '',
    value: '',
    fieldSize: 'middle',
    shape: 'round',
    label: 'Label',
    labelPosition: 'top',
    placeholder: 'Text',
    errorMessage: '',
    allowClear: false,
    disabled: false,
    maxLength: 0,
    icon: <Icon name="user" size={64} />,
    onChange: undefined,
    onPressEnter: undefined,
    className: '',
  },
};

const InputFieldWithHooks = () => {
  const [value, setValue] = useState('Start value');
  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <Input value={value} onChange={handleChange} maxLength={32} allowClear />
  );
};

export const ControlledInput: Story = {
  render: () => <InputFieldWithHooks />,
};
