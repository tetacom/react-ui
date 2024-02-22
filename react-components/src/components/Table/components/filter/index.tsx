import React, { FC } from 'react';
import { Column, Table } from '@tanstack/react-table';

import { FilterType, IDictionary } from '../../model/public-api';
import { Typography } from '../../../Typography';
import { Input } from '../../../Input';
import { Checkbox } from '../../../Checkbox';
import { Stack } from '../../../Stack';
import { StringFilter } from './string-filter';
import { DateFilter } from './date-filter';

import s from './style.module.scss';

const FilterItemWrapper: FC<{ caption: string } & React.PropsWithChildren> = ({
  caption,
  children,
}) => {
  return (
    <Stack block size={12} direction="column">
      <Typography.Text fontVariant="title3">{caption}</Typography.Text>
      {children}
    </Stack>
  );
};

export type FilterProps<T> = {
  columns: Array<Column<T, unknown>>;
  table: Table<T>;
  dict: IDictionary | null;
};

export function Filter<T>(props: FilterProps<T>) {
  const { columns } = props;

  return (
    <Stack block size={24} direction="column">
      {columns.map((column) => {
        const meta = column.columnDef.meta;

        if (meta?.tableColumn.filterType === FilterType.string) {
          const currentValue = (column.getFilterValue() as string) ?? '';

          return (
            <FilterItemWrapper
              key={column.id}
              caption={meta?.tableColumn.caption}
            >
              <StringFilter
                placeholder={meta?.tableColumn.caption}
                value={currentValue}
                onChange={(newValue) => {
                  column.setFilterValue(() => newValue);
                }}
              />
            </FilterItemWrapper>
          );
        }

        if (meta?.tableColumn.filterType === FilterType.date) {
          const currentValue = column.getFilterValue() as [string, string];

          return (
            <FilterItemWrapper
              key={column.id}
              caption={meta?.tableColumn.caption}
            >
              <DateFilter
                dates={[currentValue?.[0], currentValue?.[1]]}
                onChange={(values) => {
                  column.setFilterValue(() => values);
                }}
              />
            </FilterItemWrapper>
          );
        }

        if (meta?.tableColumn.filterType === FilterType.list) {
          const items = props.table.options.meta?.dictionary?.[
            meta?.tableColumn.filterField
          ]
            ?.map(({ id, name }) => {
              return {
                id: id.toString(),
                name: name,
              };
            })
            .filter(({ id }) => {
              return props.table.getPreFilteredRowModel().flatRows.some((_) => {
                return (
                  (_.original as any)[meta?.tableColumn.name] ===
                  parseInt(id, 10)
                );
              });
            });

          const currentItems = (column.getFilterValue() as number[])?.map(
            (id) => {
              return {
                id: id.toString(),
                name:
                  items?.find((item) => parseInt(item.id, 10) === id)?.name ||
                  '',
              };
            },
          );

          return (
            <FilterItemWrapper
              key={column.id}
              caption={meta?.tableColumn.caption}
            >
              <Checkbox.Group
                direction="column"
                className={s.checkboxGroup}
                options={items || []}
                value={currentItems || items}
                onChange={(e) => {
                  const ids = e.map((_) => parseInt(_.id as string, 10));
                  column.setFilterValue(() => ids);
                }}
              />
            </FilterItemWrapper>
          );
        }

        if (meta?.tableColumn.filterType === FilterType.number) {
          const min = column.getFacetedMinMaxValues()?.[0] ?? '';
          const max = column.getFacetedMinMaxValues()?.[1] ?? '';
          const currentValue = column.getFilterValue() as [number, number];

          return (
            <FilterItemWrapper
              key={column.id}
              caption={meta?.tableColumn.caption}
            >
              <div className={s.interval}>
                <Input.Text
                  type="number"
                  step={1}
                  placeholder={min.toString()}
                  value={currentValue?.[0] ?? ''}
                  onChange={(value) =>
                    column.setFilterValue((old: [number, number]) => [
                      value,
                      old?.[1],
                    ])
                  }
                />
                -
                <Input.Text
                  type="number"
                  step={1}
                  placeholder={max.toString()}
                  value={currentValue?.[1] ?? ''}
                  onChange={(value) =>
                    column.setFilterValue((old: [number, number]) => [
                      old?.[0],
                      value,
                    ])
                  }
                />
              </div>
            </FilterItemWrapper>
          );
        }

        if (meta?.tableColumn.filterType === FilterType.boolean) {
          const items = [
            {
              id: 0,
              name: 'Нет',
            },
            {
              id: 1,
              name: 'Да',
            },
          ];

          const currentItems = (column.getFilterValue() as number[])?.map(
            (id) => {
              return {
                id,
                name: items?.find((item) => item.id === id)?.name || '',
              };
            },
          );

          return (
            <FilterItemWrapper
              key={column.id}
              caption={meta?.tableColumn.caption}
            >
              <Checkbox.Group
                direction="column"
                className={s.checkboxGroup}
                options={items}
                value={currentItems || items}
                onChange={(e) => {
                  const ids = e.map((_) => parseInt(_.id as string, 10));
                  column.setFilterValue(() => ids);
                }}
              />
            </FilterItemWrapper>
          );
        }

        if (meta?.tableColumn.filterType === FilterType.custom) {
          return null;
        }

        return null;
      })}
    </Stack>
  );
}
