import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import classNames from 'classnames';
import {
  AccessorFn,
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  HeaderGroup,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import { TableProps } from './model';
import TableRow from './components/RowTable';
import { Icon } from '../Icons';
import { sortIconNames } from './sortIconNames';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { mergeSettings, separateSettings } from './storageUtils';
import type { TableColumn } from './model/table-column';
import { Tooltip } from '../Tooltip';

import s from './style.module.scss';
import { eventIsOnRow, getCellComponent, getCoordinates } from './helpers';
import { ICellEvent } from './model/i-cell-event';
import { ICellComponent } from './model/i-cell-component';
import objectHash from 'object-hash';
import { IIdName } from './model/dictionary';
import { StringCell } from './components/default/StringCell';
import { CustomCellComponent } from './model/cell-component';

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
  className,
  valueChange,
  ...props
}: TableProps<T>): React.ReactElement {
  const storageKey = localStorageKey ? `${localStorageKey}${STORAGE_KEY}` : '';
  const initStorageColumns = separateSettings(
    columns,
    columns.map(({ name, width }) => ({ name, width })),
  );
  const columnHelper = createColumnHelper<T>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const currentEventRef = useRef<KeyboardEvent | MouseEvent | null>(null);
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
          ...props
        }) =>
          columnHelper.accessor(name as any, {
            id: name,
            enableSorting: sortable,
            cell: ({ row, column, table }) => {
              const isEdit =
                table.options.meta?.currentEditCell?.row === parseInt(row.id) &&
                table.options.meta?.currentEditCell?.column === column.id;

              const columnIndex = columnsWithSavedData?.findIndex(
                (_) => _.name === column.id,
              );

              const columnsCount = columnsWithSavedData?.length;
              const rowIndex = parseInt(row.id) + 1;
              const cellIndex = (rowIndex - 1) * columnsCount + columnIndex;

              const cellProps: ICellComponent<T> = {
                column,
                table,
                row,
                dict: Object.hasOwn(dictionary, props.filterField)
                  ? dictionary[props.filterField]
                  : [],
                isEdit,
                cellIndex,
              };

              const defaultCellComponent = getCellComponent(filterType!);

              return React.createElement(
                cellComponent || defaultCellComponent || StringCell,
                cellProps,
              );
            },
            header: () => caption,
            size: width,
            meta: {
              tableColumn: {
                name,
                caption,
                cellComponent,
                propertyName,
                filterType,
                width,
                sortable,
                ...props,
              },
            },
          }),
      ),
    [columnsWithSavedData, dictionary],
  );

  const [rowSelection, setRowSelection] = useState({});
  const [currentEditCell, setCurrentEditCell] = useState<ICellEvent | null>(
    null,
  );

  const [data, setData] = useState<T[]>([...dataSource]);

  useEffect(() => {
    setData([...dataSource]);
  }, [dataSource]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      rowSelection,
      sorting,
    },
    onSortingChange: setSorting,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      currentEditCell: currentEditCell,
      startEditCell: (event: ICellEvent | null) => {
        if (
          currentEditCell?.column !== event?.column ||
          currentEditCell?.row !== event?.row
        ) {
          setCurrentEditCell(event);
        }
      },
      valueChanged: (value: T) => {
        if (currentEditCell?.row && currentEditCell?.column) {
          const row = table.getRow(currentEditCell.row.toString());
          const column = table.getColumn(currentEditCell.column);

          const foundRowIndex = data?.findIndex((_) => _ === row.original);

          if (foundRowIndex !== -1) {
            const updatedData = data.map((row, index) => {
              if (foundRowIndex === index) {
                return {
                  ...data[foundRowIndex],
                  [currentEditCell.column]: value,
                };
              }

              return row;
            });

            const rowHashChanged =
              objectHash.sha1(data[foundRowIndex]!) !==
              objectHash.sha1(updatedData[foundRowIndex]!);

            if (rowHashChanged) {
              valueChange?.({
                row: row.original,
                column: column.columnDef.meta?.tableColumn!,
              });

              setData(updatedData);
            }
          }
        }
      },
    },
  });

  const handleDblClick = (event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    table.options?.meta?.startEditCell(coordinates);
  };

  const handleFocusIn = (event: FocusEvent) => {
    const coordinates = getCoordinates(event);

    if (currentEventRef.current instanceof MouseEvent) {
      return;
    }

    if (table.options?.meta?.currentEditCell != null) {
      table.options?.meta?.startEditCell(coordinates);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    currentEventRef.current = event;
  };

  const handleMouseDown = (event: MouseEvent) => {
    currentEventRef.current = event;
  };

  const handleClick = (event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    const isOnRow = eventIsOnRow(event);

    if (coordinates) {
      if (
        (table.options.meta?.currentEditCell &&
          coordinates.row !== table.options.meta?.currentEditCell.row) ||
        coordinates.column !== table.options.meta?.currentEditCell?.column
      ) {
        table.options.meta?.startEditCell(null);
      }
    }

    if (!isOnRow) {
      table.options.meta?.startEditCell(null);
    }
  };

  useEffect(() => {
    document.addEventListener('dblclick', handleDblClick);
    return () => document.removeEventListener('dblclick', handleDblClick);
  });

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  });

  const handleResizeMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    header: Header<T, unknown>,
    headerGroup: HeaderGroup<T>,
  ) => {
    const resizeHandler = header.getResizeHandler();

    document.addEventListener(
      'mouseup',
      (e) => {
        handleSaveColumnsWidth(columnsWithSavedData, headerGroup.headers);
      },
      { once: true },
    );

    return resizeHandler(event);
  };

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
                const thCaption =
                  columnsWithSavedData.find(({ name }) => name === header.id)
                    ?.caption ?? '';

                return (
                  <Tooltip
                    key={header.id}
                    title={thCaption}
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
                            onMouseDown={(event) =>
                              handleResizeMouseDown(event, header, headerGroup)
                            }
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
                table={table}
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
