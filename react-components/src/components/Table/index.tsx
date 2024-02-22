import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import {
  flexRender,
  Header,
  HeaderGroup,
  Row,
  Table as TanStackTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import { TableProps } from './model';
import { VerticalAlign } from './model/vertical-align';
import TableRow from './components/row';
import { Icon } from '../Icons';
import { sortIconNames } from './sortIconNames';
import { Tooltip } from '../Tooltip';
import { Drawer } from '../Drawer';
import { Button } from '../Button';
import { Filter } from './components/filter';
import { useTable } from './useTable';
import { Stack } from '../Stack';
import { Skeleton } from './components/skeleton';
import { Result } from '../Result';
import { eventIsOnRow, getCoordinates, lockedClasses } from './helpers';
import { LockedColumn } from './model/enum/locked-column.enum';
import { useStickyStyles } from './useStickyStyles';
import noDataImg from './assets/no-data.svg';

import s from './style.module.scss';

const RESIZER_ATTRIBUTE_NAME = 'resizer';

const verticalAlignValues: Record<VerticalAlign, string> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
};

export function Table<T>({
  dataSource,
  columns,
  sticky = true,
  skeleton = null,
  dictionary = null,
  cellParams = {
    verticalClamp: 4,
  },
  height = '100vh',
  onClick,
  acrossLine = false,
  localStorageKey,
  className,
  valueChange,
  verticalAlign = 'top',
  headerComponent = null,
  parent,
  ...props
}: TableProps<T>): React.ReactElement {
  const currentEventRef = useRef<KeyboardEvent | MouseEvent | null>(null);

  const [filterIsOpen, setFilterOpen] = useState(false);

  let table: TanStackTable<T>;

  if (props.table) {
    table = props.table;
  } else {
    // Переделать conditional hook
    // eslint-disable-next-line react-hooks/rules-of-hooks
    table = useTable({
      data: dataSource || [],
      columns: columns || [],
      dictionary,
      storageKey: localStorageKey,
    });
  }

  table.options.meta?._onValueChanged?.((value: any) => {
    valueChange?.(value);
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

    if (event.key === 'Escape') {
      // setCurrentEditCell(null);
      table.options.meta?.startEditCell(null);
    }

    if (event.key === 'Enter') {
      // setCurrentEditCell(null);
      table.options.meta?.startEditCell(null);
    }
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
  const handleSaveColumns = (headers: Header<T, unknown>[]) => {
    if (!localStorageKey) return;
    table.options.meta?._saveColumnsToLocalStorage(headers);
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
        handleSaveColumns(headerGroup.headers);
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
    overscan: 2,
  });

  const tableWidth = table.getCenterTotalSize();
  const rowTemplateColumns = useMemo(
    () =>
      table
        .getAllColumns()
        .filter((column) => column.getIsVisible())
        .map((column) => `${column.getSize()}px`)
        .join(' '),
    [tableWidth],
  );

  const cellStyles = {
    '--cell-vert-clamp': cellParams.verticalClamp,
    '--tbody-transform': `${virtualizer.getVirtualItems()[0]?.start}px`,
    '--row-template-columns': rowTemplateColumns,
    '--vertical-align': verticalAlignValues[verticalAlign],
  };

  const lockedColumnsVariables = useStickyStyles(
    table.getHeaderGroups(),
    tableWidth,
  );

  const state = table.getState();
  const filterApplied = state.columnFilters.length > 0;
  const virtualRows = virtualizer.getVirtualItems();

  return (
    <div className={s.root} style={{ height }}>
      <Stack
        size={12}
        block
        className={s.filters}
        justifyContent="space-between"
      >
        <div>{headerComponent}</div>

        <Stack divider>
          <Button onClick={() => setFilterOpen(true)} view="ghost" square>
            <Icon name={filterApplied ? 'filterApplied' : 'filter'} />
          </Button>
          <Button
            disabled={!filterApplied}
            onClick={() => table.resetColumnFilters()}
            view="ghost"
            square
          >
            <Icon name="filterClear" />
          </Button>
        </Stack>
      </Stack>
      <Drawer
        open={filterIsOpen}
        onClose={() => setFilterOpen(false)}
        title="Фильтр"
        parent={parent}
        zIndex={2}
        width={420}
      >
        <Filter
          dict={dictionary}
          table={table}
          columns={table.getVisibleFlatColumns()}
        />
      </Drawer>

      <div className={s.tableWrapper} ref={parentRef}>
        <Skeleton skeleton={skeleton}>
          {Boolean(virtualRows.length) && (
            <table
              className={classNames(s.table, className)}
              style={{
                ...cellStyles,
                width: tableWidth,
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
                        columns?.find(({ name }) => name === header.id)?.hint ??
                        '';

                      const columnLockedData = lockedColumnsVariables.get(
                        header.column.id,
                      );
                      const columnLocked =
                        columnLockedData?.lockedValue ?? LockedColumn.none;

                      let stickyClasses = '';
                      if (columnLockedData?.isExtreme) {
                        if (columnLocked === LockedColumn.left) {
                          stickyClasses = s.lockedHeadLeftLast;
                        } else if (columnLocked === LockedColumn.right) {
                          stickyClasses = s.lockedHeadRightFirst;
                        }
                      }

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

                              const handler =
                                header.column.getToggleSortingHandler();
                              handler?.(event);
                            }}
                            className={classNames(
                              lockedClasses[columnLocked]?.head,
                              stickyClasses,
                              header.column.getCanSort() && s.isSortable,
                            )}
                            style={columnLockedData?.variables}
                          >
                            {header.isPlaceholder ? null : (
                              <div className={s.thContent}>
                                <div>{thContent}</div>

                                {isSorted ? (
                                  <Icon
                                    name={sortIconNames.get(isSorted) ?? ''}
                                    className={s.thContentIcon}
                                  />
                                ) : null}
                              </div>
                            )}
                            <div
                              data-type={RESIZER_ATTRIBUTE_NAME}
                              className={classNames(
                                s.resizer,
                                header.column.getIsResizing() &&
                                  s.resizerIsResizing,
                              )}
                              onMouseDown={(event) =>
                                handleResizeMouseDown(
                                  event,
                                  header,
                                  headerGroup,
                                )
                              }
                            />
                          </th>
                        </Tooltip>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody>
                {virtualRows.map((virtualRow) => {
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
                      lockedColumnsVariables={lockedColumnsVariables}
                    />
                  );
                })}
              </tbody>
            </table>
          )}

          {!Boolean(virtualRows.length) && (
            <Result
              title="Данные отсутствуют"
              picture={<img src={noDataImg} alt="" />}
              style={{ height: '100%' }}
            />
          )}
        </Skeleton>
      </div>
    </div>
  );
}
