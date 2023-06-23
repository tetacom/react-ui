import { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../index';
import { TypographyDocs } from '../docs';
import { TableColumn } from '../model/table-column';

import configResponse from './configResponse.json';
import dataResponse from './dataResponse.json';
import dictResponse from './dictResponse.json';

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

const TableStory: FC<{ sticky?: boolean }> = ({ sticky = false }) => (
  <Table
    dataSource={dataResponse}
    columns={configResponse as unknown as TableColumn[]}
    sticky={sticky}
    dictionary={dictResponse}
  />
);

export const Default: Story = {
  render: ({ ...args }) => <TableStory {...args} />,
  args: {
    sticky: true,
  },
};
