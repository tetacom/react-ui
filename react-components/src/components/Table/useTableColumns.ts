import { FilterType, IDictionary, TableColumn } from './model/public-api';
import React, { useMemo } from 'react';
import { ICellComponent } from './model/i-cell-component';
import { getCellComponent } from './helpers';
import { StringCell } from './components/default/string-cell';
import { createColumnHelper } from '@tanstack/react-table';

type Config = {
  columns: TableColumn[];
  dictionary: IDictionary | null;
  columnsHash: string;
};

const defaultFilterMap = new Map<FilterType, string>()
  .set(FilterType.boolean, 'boolean')
  .set(FilterType.list, 'list')
  .set(FilterType.string, 'string')
  .set(FilterType.date, 'date');

export const useTableColumns = <T>({
  columns,
  dictionary,
  columnsHash,
}: Config) => {
  const columnHelper = createColumnHelper<T>();

  return useMemo(
    () =>
      columns.map(
        ({
          name,
          caption,
          cellComponent,
          propertyName,
          filterType,
          width,
          sortable,
          editable,
          locked,
          ...props
        }) =>
          columnHelper.accessor(name as any, {
            id: name,
            enableSorting: sortable,
            cell: ({ row, column, table }) => {
              const isEdit =
                table.options.meta?.currentEditCell?.row === parseInt(row.id) &&
                table.options.meta?.currentEditCell?.column === column.id;

              const columnIndex = columns?.findIndex(
                (_) => _.name === column.id,
              );

              const columnsCount = columns?.length;

              // Считаем индексы для tabIndex для навигация с клавиатуры
              const rowIndex = parseInt(row.id) + 1;
              const cellIndex = (rowIndex - 1) * columnsCount + columnIndex;

              const cellProps: ICellComponent<T> = {
                column,
                table,
                row,
                dict: dictionary,
                isEdit: editable ? isEdit : false,
                cellIndex: editable ? cellIndex : -1,
              };

              const defaultCellComponent = getCellComponent(
                filterType || FilterType.string,
              );

              return React.createElement(
                cellComponent || defaultCellComponent || StringCell,
                cellProps,
              );
            },
            header: () => caption,
            size: width,
            filterFn: defaultFilterMap.has(filterType!)
              ? defaultFilterMap.get(filterType!)
              : ('auto' as any),
            meta: {
              tableColumn: {
                name,
                caption,
                cellComponent,
                propertyName,
                filterType,
                width,
                sortable,
                editable,
                locked,
                ...props,
              },
            },
          }),
      ),
    [columnsHash, dictionary],
  );
};
