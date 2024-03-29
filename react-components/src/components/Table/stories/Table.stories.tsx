import React, { FC, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';

import configResponse from './configResponse.json';
import dataResponse from './dataResponse.json';
import dictResponse from './dictResponse.json';

import { Table } from '../index';
import { TableDocs } from '../docs';
import { TableColumn } from '../model/table-column';
import { IDictionary } from '../model/dictionary';
import { CellParamsType } from '../model/cell-params';
import { Skeleton } from '../../Skeleton';
import { Card } from '../../Card';
import { ClusterDto } from './tableType';
import { FilterType, ICellInstance } from '../model/public-api';

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    docs: {
      page: TableDocs,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Table>;

const initData: ClusterDto[] = dataResponse;
const initColumns: TableColumn[] = configResponse;
const initDictionary: IDictionary = dictResponse;

const hiddenFields = [
  'year',
  'fieldId',
  'ngduId',
  'investmentDate',
  'coordinateX',
  'coordinateY',
  'landAllocationDuration',
  'idd',
  'netPresentValue',
  'payBackTime',
  'sitePreparationDuration',
  'iddCoeff',
  'netPresentValueCoeff',
];
const smallTableColumns = initColumns.map((column) => {
  if (hiddenFields.includes(column.name)) {
    return { ...column, hidden: true };
  }

  return column;
});

const TableStory: FC<{
  columns: TableColumn[];
  localStorageKey?: string;
  sticky?: boolean;
  loading?: boolean;
  cellParams?: CellParamsType;
  height?: React.CSSProperties['height'];
  acrossLine?: boolean;
}> = ({
  columns,
  localStorageKey,
  sticky = false,
  loading = false,
  cellParams,
  height,
  acrossLine,
}) => {
  const cols = columns.map((column) => {
    if (column.filterType === FilterType.number) {
      return {
        ...column,
        formatter: (value: number | null) => {
          return value ? value.toString() : '-';
        },
      };
    }

    if (column.filterType === FilterType.date) {
      return {
        ...column,
        formatter: (value: string | null) => {
          const date = dayjs(value);
          return date.format('DD MMM YYYY');
        },
      };
    }
    return column;
  });

  const [data, setData] = useState(initData);
  const handleChange = (value: ICellInstance<ClusterDto>) => {
    const valueIndex = data.findIndex((item) => item.id === value.row.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setData(data.with(valueIndex, value.row));
  };

  return (
    <Card
      style={{
        padding: 0,
      }}
    >
      <Table
        localStorageKey={localStorageKey}
        height={height}
        acrossLine={acrossLine}
        dataSource={data}
        columns={cols}
        sticky={sticky}
        valueChange={handleChange}
        skeleton={
          loading ? (
            <Skeleton
              rows={16}
              columns={new Array(columns.length).fill(1)}
              columnsUnit="fr"
              isTable
            />
          ) : undefined
        }
        dictionary={initDictionary}
        cellParams={cellParams}
      />
    </Card>
  );
};

export const Default: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  render: ({ ...args }) => <TableStory {...args} />,
  args: {
    columns: initColumns,
    localStorageKey: 'sb-default',
    sticky: true,
    cellParams: {
      verticalClamp: 3,
    },
    height: 'calc(100vh - 32px)',
    acrossLine: false,
  },
};

export const SmallTable: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  render: ({ ...args }) => <TableStory {...args} />,
  args: {
    columns: smallTableColumns,
    localStorageKey: 'sb-small',
    sticky: true,
    cellParams: {
      verticalClamp: 3,
    },
    height: 'calc(100vh - 32px)',
    acrossLine: true,
  },
};
