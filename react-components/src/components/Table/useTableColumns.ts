import {
  FilterType,
  IDictionary,
  TableColumn,
  UtcOffset,
} from './model/public-api';
import React, { useMemo } from 'react';
import { ICellComponent } from './model/i-cell-component';
import { getCellComponent } from './helpers';
import { StringCell } from './components/default/StringCell';
import { createColumnHelper } from '@tanstack/react-table';

type Config = {
  columns: TableColumn[];
  dictionary: IDictionary | null;
  dateFormat?: string;
  utcOffset?: UtcOffset;
  roundToDecimalPlaces?: number;
};

export const useTableColumns = <T>({
  columns,
  dictionary,
  dateFormat,
  roundToDecimalPlaces,
  utcOffset,
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
                cellIndex: editable ? cellIndex : Number.MAX_VALUE,
                dateFormat,
                roundToDecimalPlaces,
                utcOffset,
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
    [columns, dictionary, dateFormat, utcOffset, roundToDecimalPlaces],
  );
};
