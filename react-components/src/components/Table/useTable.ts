import {
  SortingState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ICellEvent } from './model/i-cell-event';
import objectHash, { sha1 } from 'object-hash';
import { ICellInstance } from './model/i-cell-instance';
import { useColumnVisibility } from './useColumnVisibility';
import { IDictionary, TableColumn } from './model/public-api';
import { useTableColumns } from './useTableColumns';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { LocalStorageColumn, mergeSettings } from './storageUtils';
import { Filters } from './components/filter/filters';

export type TableProps<T> = {
  data: T[];
  columns: TableColumn[];
  dictionary?: IDictionary | null;
  storageKey?: string;
};

export function useTable<T>(props: TableProps<T>) {
  // Данные таблицы
  const [data, setData] = useState<T[]>(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  // Ключ для localstorage
  const storageKey = props.storageKey
    ? `${props.storageKey}_table_settings`
    : '';

  // Текущая редактируемая ячейка
  const [currentEditCell, setCurrentEditCell] = useState<ICellEvent | null>(
    null,
  );

  // Настройки из localstorage
  const [localStorageColumns, setLocalStorageColumns] = useLocalStorage<
    LocalStorageColumn[]
  >(
    storageKey,
    props.columns.map(({ name, width }) => ({
      name,
      width,
    })),
  );

  const columnsHash = objectHash(props.columns.map((_) => _.name));

  const mergedColumns = useMemo(
    () => mergeSettings(props.columns, localStorageColumns),
    [columnsHash],
  );

  // Генерация колонок для react-table
  const columnDefList = useTableColumns<T>({
    columns: mergedColumns,
    dictionary: props.dictionary || null,
    columnsHash,
  });

  // Текущая сортировка столбцов
  const [sorting, setSorting] = useState<SortingState>([]);

  // Скрытые колонки
  const columnVisibility = useColumnVisibility(props.columns);

  // Выбранная строка
  const [rowSelection, setRowSelection] = useState({});

  const _valueChangedFnRef = useRef(null);
  const _updateDataFnRef = useRef(null);

  const table = useReactTable({
    data: data,
    columns: columnDefList,
    state: {
      rowSelection,
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    enableRowSelection: true,
    enableFilters: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    filterFns: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      string: Filters.string,
      list: Filters.list,
      boolean: Filters.boolean,
      date: Filters.date,
    },
    meta: {
      dictionary: props.dictionary,
      currentEditCell: currentEditCell,
      startEditCell: (event: ICellEvent | null) => {
        if (
          currentEditCell?.column !== event?.column ||
          currentEditCell?.row !== event?.row
        ) {
          setCurrentEditCell(event);
        }
      },
      _onValueChanged: (fn: any) => {
        _valueChangedFnRef.current = fn;
      },
      _onDataUpdate: (fn: any) => {
        _updateDataFnRef.current = fn;
      },
      _saveColumnsToLocalStorage: (items) => {
        setLocalStorageColumns(
          items.map((item) => ({
            name: item.id,
            width: item.getSize(),
          })),
        );
      },
      valueChanged: (value: T) => {
        if (
          currentEditCell?.row !== null &&
          currentEditCell?.row !== undefined &&
          currentEditCell?.column !== null
        ) {
          const row = table.getRow(currentEditCell.row.toString());
          const column = table.getColumn(currentEditCell.column);
          const foundRowIndex = props.data?.findIndex((dataItem) =>
            Object.is(dataItem, row.original),
          );

          if (foundRowIndex !== -1) {
            const updatedData = props.data.map((row, index) => {
              if (foundRowIndex === index) {
                return {
                  ...value,
                };
              }

              return row;
            });

            const isRowChanged =
              sha1(value!) !== sha1(props.data[foundRowIndex]!);

            if (isRowChanged) {
              setData(updatedData);

              if (column && column.columnDef.meta) {
                const coordinates = {
                  row: updatedData[foundRowIndex],
                  column: column.columnDef.meta?.tableColumn,
                } as ICellInstance<T>;

                (_valueChangedFnRef.current as any)?.(coordinates);
              }
            }
          }
        }
      },
    },
  });

  return table;
}
