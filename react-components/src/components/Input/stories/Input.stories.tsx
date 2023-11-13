import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../index';
import { InputDocs } from '../docs';
import { useState } from 'react';

const meta: Meta<typeof Input.Text> = {
  title: 'Data Entry/Input',
  component: Input.Text,
  argTypes: { onChange: { action: 'changed' } },
  parameters: {
    docs: {
      page: InputDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Input.Text>;

export const Default: Story = {
  args: {
    defaultValue: '',
    size: 'middle',
    shape: 'round',
    label: 'Label',
    labelPosition: 'top',
    placeholder: 'Text',
    errorMessage: '',
    disabled: false,
    readonly: false,
    maxLength: 0,
    leftIconName: 'user',
    onChange: undefined,
    onPressEnter: undefined,
    className: '',
  },
};

const ClearableInput = () => {
  const [value, setValue] = useState('Start value');
  const handleChange = (value: string) => {
    setValue(value);
  };
  const handleClear = () => {
    setValue('');
  };

  return (
    <Input.Text
      value={value}
      onChange={handleChange}
      maxLength={32}
      rightIcon={{ icon: 'closeCircle', onClick: handleClear }}
    />
  );
};

export const ClearableInputStory: Story = {
  render: () => <ClearableInput />,
};

const PasswordTypeInput = () => {
  const [value, setValue] = useState('Он не понимает, я не понимаю');
  const handleChange = (value: string) => {
    setValue(value);
  };

  const [inputType, setInputType] = useState<'text' | 'password'>('password');
  const toggleInputType = () => {
    setInputType(inputType === 'text' ? 'password' : 'text');
  };

  return (
    <Input.Text
      type={inputType}
      value={value}
      onChange={handleChange}
      maxLength={32}
      rightIcon={{
        icon: inputType === 'text' ? 'eyeCrossed' : 'eye',
        onClick: toggleInputType,
      }}
      style={{ width: 240 }}
    />
  );
};

export const PasswordInputStory: Story = {
  render: () => <PasswordTypeInput />,
};

const Textarea = () => {
  const [value, setValue] = useState('Start value');
  const handleChange = (value: string) => {
    setValue(value);
  };
  const handleClear = () => {
    setValue('');
  };

  return (
    <Input.Textarea
      value={value}
      onChange={handleChange}
      height={160}
      maxLength={32}
      rightIcon={{ icon: 'closeCircle', onClick: handleClear }}
    />
  );
};

export const TextareaStory: Story = {
  render: () => <Textarea />,
};
