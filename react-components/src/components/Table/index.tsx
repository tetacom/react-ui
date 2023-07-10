import React, { useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

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
  },
  height = '100vh',
  onClick,
  className,
  ...props
}: TableProps<T>): React.ReactElement {
  const columnHelper = createColumnHelper<T>();
  const tableColumns = useMemo(() => {
    return columns.map(
      ({ name, caption, cellComponent, propertyName, filterType, width }) => {
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
          size: width,
        });
      },
    );
  }, [columns, dictionary, columnHelper]);

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

  const parentRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();
  const virtualizer = useVirtualizer({
    count: rows.length,
    paddingStart: parentRef.current?.querySelector('thead')?.offsetHeight ?? 28,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 28,
    overscan: 5,
  });

  const cellStyles = {
    '--cell-vert-clamp': cellParams.verticalClamp,
  };

  if (skeleton) return skeleton;

  return (
    <div className={s.root} ref={parentRef} style={{ height }}>
      <table
        {...props}
        className={classNames(s.table, className)}
        style={{
          ...cellStyles,
          height: virtualizer.getTotalSize(),
        }}
      >
        <thead className={classNames(sticky && s.sticky)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ width: header.getSize() }}>
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

        <tbody
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${
              virtualizer.getVirtualItems()[0].start
            }px)`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<T>;

            return (
              <TableRow
                key={virtualRow.key}
                virtualIndex={virtualRow.index}
                rowRef={virtualizer.measureElement}
                row={row}
                columns={columns}
                isSelectedRow={row.getIsSelected()}
                onClick={onClick}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
