import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from '../index';
import { useState } from 'react';
import { ToggleDocs } from '../docs';

const meta: Meta<typeof Toggle> = {
  title: 'Data Entry/Toggle',
  component: Toggle,
  argTypes: { onChange: { action: 'changed' } },
  parameters: {
    docs: {
      page: ToggleDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    loading: false,
    autoFocus: false,
    className: '',
  },
};

const TabsWithHooks = () => {
  const [isOn, setIsOn] = useState(false);
  const handleChange = (checked: boolean) => {
    console.log(checked);
    setIsOn(!isOn);
  };

  return <Toggle checked={isOn} onChange={handleChange} autoFocus />;
};

export const ControlledToggle: Story = {
  render: () => <TabsWithHooks />,
};
