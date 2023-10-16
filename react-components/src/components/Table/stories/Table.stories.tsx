import React, { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../index';
import { TableDocs } from '../docs';
import { TableColumn } from '../model/table-column';
import { IDictionary } from '../model/dictionary';
import { CellParamsType } from '../model/cell-params';
import { Skeleton } from '../../Skeleton';
import { Typography } from '../../Typography';
import { ICellComponent } from '../model/i-cell-component';
import { Card } from '../../Card';

import configResponse from './configResponse.json';
import dataResponse from './dataResponse.json';
import dictResponse from './dictResponse.json';
import { ClusterDto } from './tableType';

const { Paragraph } = Typography;

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

const CustomComponentWithDate: FC<ICellComponent<ClusterDto>> = ({
  row,
  column,
}) => {
  const value = row.getValue<object>(column.id);

  if (!(typeof value === 'object' && value !== null)) {
    return value;
  }

  return (
    <div
      style={{
        padding: 'var(--radius-6) var(--radius-8)',
      }}
    >
      {Object.values(value).join(' — ')}
    </div>
  );
};

const TempCustomComponent: FC<ICellComponent<ClusterDto>> = ({ row, dict }) => {
  let ngduName;
  if (dict && Object.hasOwn(dict, 'NgduId')) {
    ngduName =
      dict?.['NgduId'].find(({ id }) => id === row.original.ngduId)?.name ??
      null;
  }

  return (
    <div
      style={{
        padding: 'var(--radius-6) var(--radius-8)',
      }}
    >
      {ngduName && (
        <Paragraph resetMargin fontVariant="body3">
          {ngduName}
        </Paragraph>
      )}
      {ngduName && (
        <Paragraph
          resetMargin
          fontVariant="caption"
          style={{ color: 'var(--color-text-50)' }}
        >
          {row.original.name}
        </Paragraph>
      )}
    </div>
  );
};

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
    const { name } = column;

    if (name === 'id') {
      return {
        ...column,
        cellComponent: TempCustomComponent,
      };
    }

    if (name === 'floodPeriodSpring' || name === 'floodPeriodAutumn') {
      return {
        ...column,
        cellComponent: CustomComponentWithDate,
      };
    }

    return column;
  });

  return (
    <Card style={{ padding: 0 }}>
      <Table
        localStorageKey={localStorageKey}
        height={height}
        acrossLine={acrossLine}
        dataSource={initData}
        columns={cols}
        sticky={sticky}
        skeleton={
          loading ? (
            <Skeleton
              rows={16}
              columns={[2, 3, 5, 10, 3, 16, 6, 9, 9, 7, 8, 10, 10]}
              columnsUnit="fr"
              isTable
            />
          ) : undefined
        }
        dictionary={initDictionary}
        cellParams={cellParams}
        dateFormat="DD MMM YYYY"
        roundToDecimalPlaces={3}
      />
    </Card>
  );
};

export const Default: Story = {
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
