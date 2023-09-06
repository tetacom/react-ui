import React, { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../index';
import { TableDocs } from '../docs';
import { TableColumn } from '../model/table-column';
import { FilterType } from '../model/enum/filter-type.enum';
import { Toggle } from '../../Toggle';
import { ICellInstance, ICustomCell } from '../model/i-cell-instance';
import { IDictionary } from '../model/dictionary';

import configResponse from './configResponse.json';
import dataResponse from './dataResponse.json';
import dictResponse from './dictResponse.json';
import { CellParamsType } from '../model/cell-params';
import { Skeleton } from '../../Skeleton';
import { Typography } from '../../Typography';
import { ICellComponent } from '../model/i-cell-component';

const { Paragraph } = Typography;

type IData = any;

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

const initColumns: TableColumn[] = configResponse;
const initDictionary: IDictionary<any> = dictResponse;

const CustomComponentWithToggle: FC<ICellComponent<any>> = ({
  row,
  column,
}) => {
  const value = row.getValue<boolean>(column.id);
  return <Toggle checked={value} />;
};

const CustomComponentWithDate: FC<ICellComponent<any>> = ({ row, column }) => {
  const value = row.getValue<object>(column.id);

  if (!(typeof value === 'object' && value !== null)) {
    return value;
  }

  return <div>{Object.values(value).join(' — ')}</div>;
};

const TempCustomComponent: FC<ICellComponent<any>> = ({
  column,
  row,
  dict,
}) => {
  let ngduName;
  const value = row.getValue<string>(column.id);

  if (dict && Object.hasOwn(dict, 'NgduId')) {
    ngduName =
      dict?.['NgduId'].find(({ id }) => id === row.original.ngduId)?.name ??
      null;
  }

  return (
    <>
      <Paragraph resetMargin fontVariant="body3">
        {value}
      </Paragraph>
      {ngduName && (
        <Paragraph
          resetMargin
          fontVariant="caption"
          style={{ color: 'var(--color-text-50)' }}
        >
          {ngduName}
        </Paragraph>
      )}
    </>
  );
};

const customComponents: Map<FilterType, FC<ICellComponent<any>>> = new Map();
customComponents.set(FilterType.boolean, CustomComponentWithToggle);
customComponents.set(FilterType.date, CustomComponentWithDate);

const TableStory: FC<{
  sticky?: boolean;
  loading?: boolean;
  cellParams?: CellParamsType;
  height?: React.CSSProperties['height'];
  acrossLine?: boolean;
}> = ({ sticky = false, loading = false, cellParams, height, acrossLine }) => {
  const columns = initColumns.map((column) => {
    const { name, filterType } = column;

    const cellComponent = filterType ? customComponents.get(filterType) : null;

    if (cellComponent) {
      return { ...column, cellComponent };
    }

    if (name === 'name') {
      return {
        ...column,
        cellComponent: TempCustomComponent,
        mergedColumnNames: ['id'],
      };
    }

    return column;
  });

  const handleClick = (cell: ICellInstance<IData>) => {
    console.log('table onClick:', cell);
  };

  return (
    <Table
      localStorageKey="sb"
      height={height}
      acrossLine={acrossLine}
      dataSource={dataResponse}
      columns={columns}
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
      onClick={handleClick}
      hiddenColumnNames={['ngduId']}
    />
  );
};

export const Default: Story = {
  render: ({ ...args }) => <TableStory {...args} />,
  args: {
    sticky: true,
    cellParams: {
      verticalClamp: 3,
    },
    height: 'calc(100vh - 16px)',
    acrossLine: false,
  },
};
