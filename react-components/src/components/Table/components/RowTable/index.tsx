import React, { memo } from 'react';
import { Column, flexRender, Row } from '@tanstack/react-table';
import classNames from 'classnames';

import { TableProps } from '../../model';
import { ICellInstance } from 'tetacom/react-components';

import s from '../../style.module.scss';

export interface ITableRow<T> {
  virtualIndex: number;
  row: Row<T>;
  columns: TableProps<T>['columns'];
  isSelectedRow?: boolean;
  onClick?: (cell: ICellInstance<T>) => void;
  rowRef: (node: Element | null) => void;
  acrossLine?: TableProps<T>['acrossLine'];
}

function TableRow<T>({
  virtualIndex,
  row,
  columns,
  isSelectedRow = false,
  onClick,
  rowRef,
  acrossLine = false,
}: ITableRow<T>) {
  const { toggleSelected, getVisibleCells } = row;

  const handleClick = (columnId: string, row: T) => {
    toggleSelected();

    const column = columns.find((item) => item.name === columnId);
    if (onClick && column) {
      onClick({
        row,
        column,
      });
    }
  };

  const rowsClassName = acrossLine
    ? (row.index % 2 && s.highlight) || ''
    : s.underline;

  return (
    <tr
      ref={rowRef}
      className={classNames(rowsClassName, isSelectedRow && s.active)}
      data-index={virtualIndex}
    >
      {getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          onClick={() => {
            handleClick(cell.column.id, cell.row.original);
          }}
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}

const getColumnsSum = (acc: number, { column }: { column: Column<any> }) => {
  return acc + column.getSize();
};

function equalTableWidth(prevProps: ITableRow<any>, nextProps: ITableRow<any>) {
  const prevWidth = prevProps.row.getVisibleCells().reduce(getColumnsSum, 0);
  const nextWidth = nextProps.row.getVisibleCells().reduce(getColumnsSum, 0);

  return prevWidth !== nextWidth;
}

export default memo(TableRow, equalTableWidth) as typeof TableRow;
