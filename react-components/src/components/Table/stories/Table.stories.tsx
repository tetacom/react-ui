import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../index';
import { columns, data } from './tableData';
import { TypographyDocs } from '../docs';

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    docs: {
      page: TypographyDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    dataSource: data,
    columns: columns,
  },
};
