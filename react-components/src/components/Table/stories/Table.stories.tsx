import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Table } from '../index';
import { TableProps } from '../model';
import { columns, data } from './tableData';

export default {
  title: 'Data Display/Table',
  component: Table,
  args: {
    dataSource: data,
    columns: columns,
  },
} as ComponentMeta<(args: TableProps) => ReturnType<typeof Table>>;

const Template: ComponentStory<
  (args: TableProps) => ReturnType<typeof Table>
> = ({ children, ...args }) => <Table {...args}>{children}</Table>;

export const Default = Template.bind({});
Default.args = {};
