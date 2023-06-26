import React, { useState } from 'react';
import classNames from 'classnames';
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { TableProps } from './model';
import TableRow from './components/RowTable';
import { Spinner } from '../Spinner';
import { FilterType } from './model/enum/filter-type.enum';

import s from './style.module.scss';

export function Table<T>({
  dataSource,
  columns,
  sticky = false,
  loading = false,
  dictionary = {},
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

          if (cellComponent) {
            return React.createElement(cellComponent, {
              value,
            });
          }

          return value;
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
          <TableRow
            key={row.id}
            row={row}
            isSelectedRow={row.getIsSelected()}
          />
        ))}
      </tbody>
    </table>
  );
}
