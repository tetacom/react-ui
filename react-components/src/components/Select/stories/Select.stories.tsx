import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '../index';
import { BaseSelectProps } from '../model/base-select-item';

interface ModelItem extends BaseSelectProps {
  color?: string;
}

const meta: Meta<typeof Select> = {
  title: 'Data Entry/Select',
  component: Select,
  argTypes: { onChange: { action: 'changed' } },
};
export default meta;

type Story = StoryObj<typeof Select>;

const CustomItem = (props: ModelItem) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          height: 12,
          width: 12,
          background: props?.color,
        }}
      />
      <div>{props?.headline}</div>
    </div>
  );
};

export const Default: Story = {
  render: (props) => {
    return (
      <div>
        <Select<ModelItem>
          {...props}
          onChangeItem={(item) => item.color}
          onItemRender={(item) => <CustomItem {...item} />}
        />
      </div>
    );
  },
  args: {
    size: 'middle',
    shape: 'round',
    label: '',
    labelPosition: 'top',
    placeholder: 'Выберите скважину',
    errorMessage: '',
    disabled: false,
    readonly: true,
    allowNull: true,
    maxLength: 0,
    onChange: undefined,
    onPressEnter: undefined,
    className: '',
    items: Array.from({ length: 50 }).map((item, index) => {
      return {
        key: index.toString(),
        headline: `Item ${index}`,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      };
    }),
  },
};
