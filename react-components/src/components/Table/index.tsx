import React, { useState } from 'react';
import classNames from 'classnames';
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Skeleton } from '../Skeleton';
import { TableProps } from './model';
import TableRow from './components/RowTable';
import { FilterType } from './model/enum/filter-type.enum';

import s from './style.module.scss';

export function Table<T>({
  dataSource,
  columns,
  sticky = false,
  loading = false,
  dictionary = {},
  cellParams = {
    verticalClamp: 1,
    maxWidth: 100,
  },
  onClick,
  className,
  ...props
}: TableProps<T>): JSX.Element {
  const columnHelper = createColumnHelper<T>();
  const tableColumns = columns.map(
    ({ name, caption, cellComponent, propertyName, filterType }) => {
      return columnHelper.accessor(name as any, {
        id: name,
        cell: (info: CellContext<T, number>) => {
          const infoValue = info.getValue();
          let dictValue = '';

          if (filterType === FilterType.list && propertyName) {
            dictValue =
              dictionary[propertyName]?.find(({ id }) => id === infoValue)
                ?.name ?? '';
          }

          const value = dictValue || infoValue;

          let result;

          if (cellComponent) {
            result = React.createElement(cellComponent, {
              value,
            });
          } else if (typeof value === 'object' && value !== null) {
            result = JSON.stringify(value);
          } else {
            result = value;
          }

          return <span>{result}</span>;
        },
        header: () => caption,
      });
    },
  );

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: dataSource,
    columns: tableColumns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <Skeleton
        rows={16}
        columns={[2, 3, 5, 10, 3, 16, 6, 9, 9, 7, 8, 10, 10]}
        columnsUnit="fr"
        isTable
      />
    );
  }

  const { maxWidth, verticalClamp } = cellParams;
  const cellMaxWidth =
    typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`;
  const cellStyles = {
    '--cell-vert-clamp': verticalClamp,
    '--cell-max-width': cellMaxWidth,
  } as React.CSSProperties;

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

      <tbody style={cellStyles}>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            row={row}
            columns={columns}
            isSelectedRow={row.getIsSelected()}
            onClick={onClick}
          />
        ))}
      </tbody>
    </table>
  );
}
