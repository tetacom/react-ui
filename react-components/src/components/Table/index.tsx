import React, { useState } from 'react';
import classNames from 'classnames';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
} from '@tanstack/react-table';

import { TableProps } from './model';
import { Spinner } from '../Spinner';

import s from './style.module.scss';

export function Table<T>({
  dataSource,
  columns,
  sticky = false,
  loading = false,
  className,
  ...props
}: TableProps<T>): JSX.Element {
  const columnHelper = createColumnHelper<T>();
  const tableColumns = columns.map(
    ({ name, caption, cellComponent, propertyName }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return columnHelper.accessor(name, {
        id: name,
        cell: (info: CellContext<T, number>) => {
          const infoValue = info.getValue();

          if (cellComponent) {
            return React.createElement(cellComponent, {
              value: infoValue,
              propertyName,
            });
          }

          return infoValue;
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

  const [selectedRowId, setSelectedRowId] = useState<null | string>(null);
  const selectRow = (rowId: string) => {
    setSelectedRowId(rowId);
  };

  if (loading) {
    const loadingRows: string[] = [];
    for (let i = 1; i <= 20; i++) {
      loadingRows.push(String(i));
    }

    return (
      <div className={s.loadTable}>
        <table {...props} className={classNames(s.table, className)}>
          <tbody>
            {loadingRows.map((item) => (
              <tr key={item}>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={s.loadTableSpinner}>
          <Spinner color="var(--color-primary-50)" size={20} />
        </div>
      </div>
    );
  }

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
          <tr
            key={row.id}
            className={classNames(selectedRowId === row.id && s.active)}
            onClick={() => {
              selectRow(row.id);
            }}
          >
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
