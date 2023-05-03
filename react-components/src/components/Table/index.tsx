import React, { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
} from '@tanstack/react-table';

import { TableProps, TableRef } from './model';
import { TableColumn } from './model/public-api';
import s from './style.module.scss';

export const Table = forwardRef<TableRef, TableProps>(
  ({ dataSource, columns, className, ...props }, ref) => {
    const data = useMemo(() => {
      return [...dataSource];
    }, [dataSource]);

    const columnHelper = createColumnHelper<object>();
    const tableColumns = columns.map(({ name, caption }) =>
      columnHelper.accessor(name as keyof TableColumn, {
        id: name,
        cell: (info: CellContext<object, number>) => info.getValue(),
        header: () => caption,
        footer: () => caption,
      }),
    );

    const table = useReactTable({
      data,
      columns: tableColumns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <table {...props} ref={ref} className={classNames(s.table, className)}>
        <thead>
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
  },
);
