import React, { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../index';
import { TypographyDocs } from '../docs';
import { TableColumn } from '../model/table-column';
import { FilterType } from '../model/enum/filter-type.enum';
import { Toggle } from '../../Toggle';
import { ICustomCell } from '../model/i-cell-instance';

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

type Dictionary = {
  id: string | number;
  name: string;
  parentId: string | null;
  iconId: string | null;
};

interface IDictionary {
  [key: string]: Dictionary[];
}

const initColumns: TableColumn[] = configResponse;
const initDictionary: IDictionary = dictResponse;

const CustomComponentWithToggle: FC<ICustomCell> = ({ value }) => (
  <Toggle checked={value} />
);

const CustomComponentWithDate: FC<ICustomCell> = ({ value }) => {
  if (!(typeof value === 'object')) {
    return value;
  }

  return Object.values(value).join(' — ');
};

const CustomComponentWithDict: FC<ICustomCell> = ({
  value,
  propertyName = '',
}) => {
  if (propertyName) {
    return (
      initDictionary[propertyName].find(({ id }) => id === value)?.name ?? value
    );
  }

  return value;
};

const customComponents: Map<FilterType, FC<ICustomCell>> = new Map();
customComponents.set(FilterType.boolean, CustomComponentWithToggle);
customComponents.set(FilterType.date, CustomComponentWithDate);
customComponents.set(FilterType.list, CustomComponentWithDict);

const TableStory: FC<{ sticky?: boolean; loading?: boolean }> = ({
  sticky = false,
  loading = false,
}) => {
  const columns = initColumns.map((item) => {
    const cellComponent = item.filterType
      ? customComponents.get(item.filterType)
      : null;

    if (cellComponent) {
      return { ...item, cellComponent };
    }

    return item;
  });

  return (
    <Table
      dataSource={dataResponse}
      columns={columns}
      sticky={sticky}
      loading={loading}
    />
  );
};

export const Default: Story = {
  render: ({ ...args }) => <TableStory {...args} />,
  args: {
    sticky: true,
    loading: false,
  },
};
