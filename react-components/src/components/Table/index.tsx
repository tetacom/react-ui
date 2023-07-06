import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';

import { TableProps } from './model';
import TableRow from './components/RowTable';
import { FilterType } from './model/enum/filter-type.enum';

import s from './style.module.scss';

export function Table<T>({
  dataSource,
  columns,
  sticky = false,
  skeleton = null,
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

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 5,
  });

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  console.log('paddingTop', paddingTop);
  console.log('paddingBottom', paddingBottom);

  if (skeleton) return skeleton;

  const { maxWidth, verticalClamp } = cellParams;
  const cellMaxWidth =
    typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`;
  const cellStyles = {
    '--cell-vert-clamp': verticalClamp,
    '--cell-max-width': cellMaxWidth,
  } as React.CSSProperties;

  return (
    <div ref={tableContainerRef} className={s.root}>
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
          {paddingTop > 0 && (
            <tr>
              <td
                style={{
                  height: `${paddingTop}px`,
                  backgroundColor: 'transparent',
                }}
              />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<T>;

            return (
              <TableRow
                key={row.id}
                row={row}
                columns={columns}
                isSelectedRow={row.getIsSelected()}
                onClick={onClick}
              />
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td
                style={{
                  height: `${paddingBottom}px`,
                  backgroundColor: 'transparent',
                }}
              />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
