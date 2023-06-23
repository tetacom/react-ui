import React, { FC } from 'react';
import classNames from 'classnames';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
} from '@tanstack/react-table';

import { TableProps } from './model';
import { Toggle } from '../Toggle';
import { FilterType } from './model/enum/filter-type.enum';

import s from './style.module.scss';

const cellMap: Map<FilterType, null | FC<{ value: any }>> = new Map();
cellMap.set(FilterType.date, ({ value }) => {
  if (!(typeof value === 'object')) {
    return value;
  }

  return Object.values(value).join(' — ');
});
cellMap.set(FilterType.boolean, ({ value }) => <Toggle checked={value} />);

export function Table<T>({
  dataSource,
  columns,
  sticky = false,
  dictionary,
  className,
  ...props
}: TableProps<T>): JSX.Element {
  const columnHelper = createColumnHelper<T>();
  const tableColumns = columns.map(
    ({ name, caption, filterType, propertyName }) => {
      const Cell = cellMap.get(filterType as FilterType) || null;
      const currentDictionary =
        dictionary && filterType === FilterType.list && propertyName
          ? dictionary[propertyName]
          : null;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return columnHelper.accessor(name, {
        id: name,
        cell: (info: CellContext<T, number>) => {
          const infoValue = info.getValue();
          const value =
            (currentDictionary
              ? currentDictionary.find(({ id }) => id === infoValue)?.name
              : infoValue) ?? infoValue;

          if (!Cell) {
            return value;
          }

          return <Cell value={value} />;
        },
        header: () => caption,
        footer: () => caption,
      });
    },
  );

  const table = useReactTable({
    data: dataSource,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table {...props} className={classNames(s.table, className)}>
      <thead className={classNames(sticky && s.sticky)}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
