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
  cellParams = {
    verticalClamp: 1,
    maxWidth: 20,
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
            result = Object.values(value).join(' — ');
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

  const cellStyles = {
    '--cell-vert-clamp': cellParams?.verticalClamp,
    '--cell-max-width': `${cellParams?.maxWidth}vw`,
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
            isSelectedRow={row.getIsSelected()}
            onClick={onClick}
          />
        ))}
      </tbody>
    </table>
  );
}
