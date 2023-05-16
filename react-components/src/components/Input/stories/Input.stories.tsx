import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../index';
import { InputDocs } from '../docs';
import { Icon } from '../../Icons';

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
    icon: <Icon name="home" size={64} />,
    // onChange: null,
    // onPressEnter: null,
    className: '',
  },
};
