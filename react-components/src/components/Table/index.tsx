import React, { useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
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
import { useLocalStorage } from '../../utils/useLocalStorage';
import { mergeSettings, separateSettings } from './storageUtils';
import type { TableColumn } from './model/table-column';
import { Tooltip } from '../Tooltip';
import { useColumnVisibility } from './useColumnVisibility';

import s from './style.module.scss';

const STORAGE_KEY = '_table_settings';
const RESIZER_ATTRIBUTE_NAME = 'resizer';

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
  localStorageKey,
  hiddenColumnNames = [],
  className,
  ...props
}: TableProps<T>): React.ReactElement {
  const storageKey = localStorageKey ? `${localStorageKey}${STORAGE_KEY}` : '';
  const initStorageColumns = separateSettings(
    columns,
    columns.map(({ name, width }) => ({ name, width })),
  );
  const columnHelper = createColumnHelper<T>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnsSettings, setColumnsSettings] = useLocalStorage(
    storageKey,
    initStorageColumns,
  );
  const columnsWithSavedData = useMemo(
    () => mergeSettings(columns, columnsSettings),
    [columns, columnsSettings],
  );

  const handleSaveColumnsWidth = (
    dataToSave: TableColumn[],
    headers: Header<T, unknown>[],
  ) => {
    if (!localStorageKey) return;

    const newColumnsSettings = separateSettings(
      dataToSave,
      headers.map((item) => ({ name: item.id, width: item.getSize() })),
    );
    setColumnsSettings(newColumnsSettings);
  };

  const tableColumns = useMemo(
    () =>
      columnsWithSavedData.map(
        ({
          name,
          caption,
          cellComponent,
          propertyName,
          filterType,
          width,
          sortable,
        }) =>
          columnHelper.accessor(name as any, {
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
                  info,
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
          }),
      ),
    [columnsWithSavedData, dictionary],
  );

  const columnVisibility = useColumnVisibility(columns, hiddenColumnNames);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: dataSource,
    columns: tableColumns,
    state: {
      rowSelection,
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
          width: table.getCenterTotalSize(),
          height: virtualizer.getTotalSize(),
        }}
      >
        <thead className={classNames(sticky && s.sticky)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                const thContent = flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                );
                const thHint =
                  columnsWithSavedData.find(({ name }) => name === header.id)
                    ?.hint ?? '';

                return (
                  <Tooltip
                    key={header.id}
                    title={thHint}
                    target="hover"
                    placement="bottom-start"
                  >
                    <th
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                        if (
                          (event.target as HTMLElement).dataset.type ===
                          RESIZER_ATTRIBUTE_NAME
                        )
                          return;

                        const handler = header.column.getToggleSortingHandler();
                        handler?.(event);
                      }}
                      className={classNames(
                        header.column.getCanSort() && s.isSortable,
                      )}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className={s.thContent}>
                          <span>{thContent}</span>

                          {isSorted ? (
                            <Icon
                              name={sortIconNames.get(isSorted) ?? ''}
                              className={s.thContentIcon}
                            />
                          ) : null}
                          <div
                            data-type={RESIZER_ATTRIBUTE_NAME}
                            className={classNames(
                              s.resizer,
                              header.column.getIsResizing() &&
                                s.resizerIsResizing,
                            )}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            onMouseUp={() => {
                              handleSaveColumnsWidth(
                                columnsWithSavedData,
                                headerGroup.headers,
                              );
                            }}
                          />
                        </div>
                      )}
                    </th>
                  </Tooltip>
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
                columns={columnsWithSavedData}
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
