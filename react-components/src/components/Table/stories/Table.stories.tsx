import React, { FC, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../index';
import { TypographyDocs } from '../docs';
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
import { Button } from '../../Button';
import { fakerRU } from '@faker-js/faker';
import { ICellComponent } from '../model/i-cell-component';

type IData = any;

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
const initDictionary: IDictionary<string> = dictResponse;

const CustomComponentWithToggle: FC<ICellComponent<ICustomCell>> = ({
  row,
  column,
}) => {
  const value = Boolean(row.getValue(column.id));
  return <Toggle checked={value} />;
};

const CustomComponentWithDate: FC<ICellComponent<ICustomCell>> = ({
  row,
  column,
}) => {
  const value = row.getValue(column.id);

  if (!(typeof value === 'object' && value !== null)) {
    return <>{value}</>;
  }
  return <div>{Object.values(value).join(' — ')}</div>;
};

const customComponents: Map<
  FilterType,
  FC<ICellComponent<ICustomCell>>
> = new Map();
customComponents.set(FilterType.boolean, CustomComponentWithToggle);
customComponents.set(FilterType.date, CustomComponentWithDate);

const generateRandomData = (length = 100) => {
  return Array.from({ length: 100 }).map((val, index) => {
    return {
      id: index,
      year: fakerRU.number.int({ min: 2005, max: 2024 }),
      name: fakerRU.address.zipCode(),
      fieldId: fakerRU.number.int({ min: 1, max: 19 }),
      ngduId: fakerRU.number.int({ min: 1, max: 7 }),
      investmentDate: '2023-09-01',
      coordinateX: fakerRU.number.float({
        min: 1070700.204444445,
        max: 6070700.204444445,
      }),
      coordinateY: fakerRU.number.float({
        min: 1322219.422222222,
        max: 4322219.422222222,
      }),
      landAllocationDuration: 0,
      idd: 1.1110146221831267,
      netPresentValue: 244299.86532799999,
      payBackTime: 50.69161832322223,
      sitePreparationDuration: 30,
      canDrillWithoutFillRoad: false,
      canDrillWithoutSiteBackfill: false,
      floodPeriodSpring: {
        floodStart: '2023-04-01',
        floodEnd: '2023-05-25',
      },
      floodPeriodAutumn: {
        floodStart: '2023-10-01',
        floodEnd: '2023-10-30',
      },
      iddCoeff: 0.6112568006101334,
      netPresentValueCoeff: 0.17471359666706768,
      payBackTimeCoeff: 0.6446453162862382,
      economicEfficiencyCoeff: 0.472103185475935,
      existInExternal: true,
    };
  });
};

const TableStory: FC<{
  sticky?: boolean;
  loading?: boolean;
  cellParams?: CellParamsType;
  height?: React.CSSProperties['height'];
  acrossLine?: boolean;
}> = ({ sticky = false, loading = false, cellParams, height, acrossLine }) => {
  const columns = initColumns.map((item) => {
    const cellComponent = item.filterType
      ? customComponents.get(item.filterType)
      : null;

    if (cellComponent) {
      return { ...item, cellComponent } as TableColumn;
    }

    return item;
  });

  const [data, setData] = useState(generateRandomData());

  const handleClick = (cell: ICellInstance<IData>) => {
    console.log('table onClick:', cell);
  };

  return (
    <div style={{ gap: 10, display: 'flex', flexDirection: 'column' }}>
      <Button
        style={{ width: 250 }}
        onClick={() => {
          setData(generateRandomData());
        }}
      >
        Сгенерировать новые данные
      </Button>
      <Table
        localStorageKey="sb"
        height={height}
        acrossLine={acrossLine}
        dataSource={data}
        columns={columns}
        sticky={sticky}
        valueChange={(cell) => console.log(cell)}
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
      />
    </div>
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
