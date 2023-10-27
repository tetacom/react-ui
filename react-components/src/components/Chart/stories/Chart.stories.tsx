import type { Meta, StoryObj } from '@storybook/react';

import { Chart, ChartProps } from '../index';
import { createChart } from './story-helper';
import { Button } from '../../Button';
import { useState } from 'react';

const ViewPort = (props: ChartProps) => {
  const [config, setConfig] = useState(props.config);

  return (
    <div style={{ height: 'calc(100vh - 50px)' }}>
      <Button onClick={() => setConfig(createChart(100))}>
        Сгенерировать новые данные
      </Button>
      <Chart config={config} />
    </div>
  );
};

const meta: Meta<typeof Chart> = {
  title: 'Data Display/Chart',
  component: ViewPort,
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Chart>;

export const Default: Story = {
  args: {
    config: createChart(100),
  },
};
