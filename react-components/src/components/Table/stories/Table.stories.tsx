import React, { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../index';
import { TypographyDocs } from '../docs';
import { TableColumn } from '../model/table-column';
import { FilterType } from '../model/enum/filter-type.enum';
import { Toggle } from '../../Toggle';
import { ICustomCell } from '../model/i-cell-instance';
import { IDictionary } from '../model/dictionary';

import configResponse from './configResponse.json';
import dataResponse from './dataResponse.json';
import dictResponse from './dictResponse.json';
import { CellParamsType } from '../model/cell-params';

type ID = string | number;

interface IData {
  id: ID;
  year: number;
  name: string;
  fieldId: ID;
  ngduId: ID;
  investmentDate: string;
  landAllocationDuration: number;
  transmissionLineDuration: number;
  sitePreparationDuration: number;
  canDrillWithoutFillRoad: boolean;
  canDrillWithoutSiteBackfill: boolean;
  floodPeriodSpring: {
    floodStart: string;
    floodEnd: string;
  };
  floodPeriodAutumn: {
    floodStart: string;
    floodEnd: string;
  };
  existInExternal: boolean;
}

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

const initColumns: TableColumn[] = configResponse;
const initDictionary: IDictionary = dictResponse;

const CustomComponentWithToggle: FC<ICustomCell> = ({ value }) => (
  <Toggle checked={value} />
);

const CustomComponentWithDate: FC<ICustomCell> = ({ value }) => {
  if (!(typeof value === 'object' && value !== null)) {
    return value;
  }

  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      {Object.values(value).join(' — ')}
    </div>
  );
};

const customComponents: Map<FilterType, FC<ICustomCell>> = new Map();
customComponents.set(FilterType.boolean, CustomComponentWithToggle);
customComponents.set(FilterType.date, CustomComponentWithDate);

const TableStory: FC<{
  sticky?: boolean;
  loading?: boolean;
  cellParams?: CellParamsType;
}> = ({ sticky = false, loading = false, cellParams }) => {
  const columns = initColumns.map((item) => {
    const cellComponent = item.filterType
      ? customComponents.get(item.filterType)
      : null;

    if (cellComponent) {
      return { ...item, cellComponent };
    }

    return item;
  });

  const handleClick = (row: IData, column?: TableColumn) => {
    console.log('table onClick:', row, column);
  };

  return (
    <Table
      dataSource={dataResponse}
      columns={columns}
      sticky={sticky}
      loading={loading}
      dictionary={initDictionary}
      cellParams={cellParams}
      onClick={handleClick}
    />
  );
};

export const Default: Story = {
  render: ({ ...args }) => <TableStory {...args} />,
  args: {
    sticky: true,
    loading: false,
    cellParams: {
      verticalClamp: 3,
      maxWidth: 420,
    },
  },
};
