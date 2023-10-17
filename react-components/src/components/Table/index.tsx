import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import {
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
import objectHash from 'object-hash';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { TableProps } from './model';
import TableRow from './components/RowTable';
import { Icon } from '../Icons';
import { sortIconNames } from './sortIconNames';
import { mergeSettings, separateSettings } from './storageUtils';
import type { TableColumn } from './model/table-column';
import { Tooltip } from '../Tooltip';
import { useColumnVisibility } from './useColumnVisibility';
import { eventIsOnRow, getCoordinates } from './helpers';
import { ICellEvent } from './model/i-cell-event';
import { useTableColumns } from './useTableColumns';
import { useLocalStorage } from '../../utils/useLocalStorage';

import s from './style.module.scss';

dayjs.extend(utc);

const STORAGE_KEY = '_table_settings';
const RESIZER_ATTRIBUTE_NAME = 'resizer';

export function Table<T>({
  dataSource,
  columns,
  sticky = false,
  skeleton = null,
  dictionary = null,
  cellParams = {
    verticalClamp: 1,
  },
  height = '100vh',
  onClick,
  acrossLine = false,
  localStorageKey,
  className,
  valueChange,
  dateFormat,
  roundToDecimalPlaces,
  utcOffset,
  ...props
}: TableProps<T>): React.ReactElement {
  // Ключ для localstorage
  const storageKey = localStorageKey ? `${localStorageKey}${STORAGE_KEY}` : '';

  const currentEventRef = useRef<KeyboardEvent | MouseEvent | null>(null);

  // Текущая сортировка столбцов
  const [sorting, setSorting] = useState<SortingState>([]);

  // Выбранная строка
  const [rowSelection, setRowSelection] = useState({});

  // Текущая редактируемая ячейка
  const [currentEditCell, setCurrentEditCell] = useState<ICellEvent | null>(
    null,
  );

  // Данные таблицы
  const [data, setData] = useState<T[]>([...dataSource]);

  useEffect(() => {
    setData([...dataSource]);
  }, [dataSource]);

  const initStorageColumns = separateSettings(
    columns,
    columns.map(({ name, width }) => ({ name, width })),
  );

  // Настройки из localstorage
  const [localStorageColumns, setLocalStorageColumns] = useLocalStorage(
    storageKey,
    initStorageColumns,
  );

  const mergedColumns = useMemo(
    () => mergeSettings(columns, localStorageColumns),
    [columns, localStorageColumns],
  );

  // Скрытые колонки
  const columnVisibility = useColumnVisibility(columns);

  // Генерация колонок для react-table
  const columnDefList = useTableColumns<T>({
    columns: mergedColumns,
    dictionary,
    dateFormat,
    roundToDecimalPlaces,
    utcOffset,
  });

  const table = useReactTable({
    data,
    columns: columnDefList,
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
        if (
          currentEditCell?.row !== null &&
          currentEditCell?.row !== undefined &&
          currentEditCell?.column !== null
        ) {
          const row = table.getRow(currentEditCell.row.toString());
          const column = table.getColumn(currentEditCell.column);

          const foundRowIndex = data?.findIndex((_) => _ === row.original);

          if (foundRowIndex !== -1) {
            const updatedData = data.map((row, index) => {
              if (foundRowIndex === index) {
                return {
                  ...data[foundRowIndex],
                  [currentEditCell.column as string]: value,
                };
              }

              return row;
            });

            const rowHashChanged =
              objectHash.sha1(data[foundRowIndex]!) !==
              objectHash.sha1(updatedData[foundRowIndex]!);

            if (rowHashChanged) {
              if (column && column.columnDef.meta) {
                valueChange?.({
                  row: row.original,
                  column: column.columnDef.meta.tableColumn,
                });
              }

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

  // Сохранение в локальное хранилище
  const handleSaveColumns = (
    columns: TableColumn[],
    headers: Header<T, unknown>[],
  ) => {
    if (!localStorageKey) return;

    const newColumnsSettings = separateSettings(
      columns,
      headers.map((item) => ({ name: item.id, width: item.getSize() })),
    );
    setLocalStorageColumns(newColumnsSettings);
  };

  // Сохранение после ресайза колонки
  const handleResizeMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    header: Header<T, unknown>,
    headerGroup: HeaderGroup<T>,
  ) => {
    const resizeHandler = header.getResizeHandler();

    document.addEventListener(
      'mouseup',
      () => {
        handleSaveColumns(mergedColumns, headerGroup.headers);
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
                const thHint =
                  columns.find(({ name }) => name === header.id)?.hint ?? '';

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
                isSelectedRow={row.getIsSelected()}
                acrossLine={acrossLine}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
