import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../index';
import { CheckboxDocs } from '../docs';

const meta: Meta<typeof Checkbox> = {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      page: CheckboxDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: true,
    children: 'Checkbox',
    disabled: false,
  },
};

const CheckboxGroupStory = () => {
  const [values, setValues] = useState(['Apple']);
  const handleChange = (value: string[]) => {
    setValues(value);
  };

  return (
    <Checkbox.Group
      options={['Apple', 'Orange', 'Banana']}
      value={values}
      onChange={handleChange}
    />
  );
};

export const CheckboxGroup: Story = {
  render: () => {
    return <CheckboxGroupStory />;
  },
};
