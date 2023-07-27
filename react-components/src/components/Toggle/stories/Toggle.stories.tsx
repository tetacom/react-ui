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
    defaultChecked: true,
    checked: undefined,
    disabled: false,
    loading: false,
    autoFocus: false,
    className: '',
  },
};

const TabsWithHooks = () => {
  const [isOn, setIsOn] = useState(false);
  const handleChange = (checked: boolean) => {
    setIsOn(checked);
  };

  return <Toggle checked={isOn} onChange={handleChange} />;
};

export const ControlledToggle: Story = {
  render: () => <TabsWithHooks />,
};
