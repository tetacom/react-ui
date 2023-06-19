import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '../index';

const meta: Meta<typeof Select> = {
  title: 'Data Entry/Select',
  component: Select,
  argTypes: { onChange: { action: 'changed' } },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (props) => (
    <div style={{ height: 10000 }}>
      <div style={{ marginTop: 300 }}>
        <Select {...props} />
      </div>
    </div>
  ),
  args: {
    size: 'middle',
    shape: 'round',
    label: '',
    labelPosition: 'top',
    placeholder: 'Выберите скважину',
    errorMessage: '',
    allowClear: false,
    disabled: false,
    readonly: true,
    allowNull: true,
    maxLength: 0,
    onChange: undefined,
    onPressEnter: undefined,
    className: '',
    items: Array.from({ length: 50 }).map((item, index) => {
      return {
        key: index,
        headline: `Item ${index}`,
      };
    }),
  },
};
