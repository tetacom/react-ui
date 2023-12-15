import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../index';
import { CheckboxDocs } from '../docs';
import { CheckboxGroupItem } from '../model/checkbox-group-item';

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
  const [values, setValues] = useState<CheckboxGroupItem[]>([
    { id: 1, name: 'Apple' },
  ]);
  const handleChange = (value: CheckboxGroupItem[]) => {
    setValues(value);
  };

  return (
    <Checkbox.Group
      options={[
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Orange' },
        { id: 3, name: 'Banana' },
      ]}
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
