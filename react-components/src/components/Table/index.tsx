import React, { useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import { TableProps } from './model';
import TableRow from './components/RowTable';
import { Icon } from '../Icons';
import { sortIconNames } from './sortIconNames';
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
  acrossLine = false,
  className,
  ...props
}: TableProps<T>): React.ReactElement {
  const columnHelper = createColumnHelper<T>();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const tableColumns = useMemo(() => {
    return columns.map(
      ({
        name,
        caption,
        cellComponent,
        propertyName,
        filterType,
        width,
        sortable,
      }) => {
        return columnHelper.accessor(name as any, {
          id: name,
          enableSorting: sortable,
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

            return <span className={s.tdContent}>{result}</span>;
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
      sorting,
    },
    onSortingChange: setSorting,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
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
    '--tbody-transform': `${virtualizer.getVirtualItems()[0]?.start}px`,
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
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={classNames(
                      header.column.getCanSort() && s.isSortable,
                    )}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className={s.thContent}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {isSorted ? (
                          <Icon
                            name={sortIconNames.get(isSorted) ?? ''}
                            className={s.thContentIcon}
                          />
                        ) : null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
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
                acrossLine={acrossLine}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
