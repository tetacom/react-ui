import React, { memo } from 'react';
import { flexRender, Row } from '@tanstack/react-table';
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
      {getVisibleCells().map((cell) => {
        const cellWidth = cell.column.getSize();

        return (
          <td
            key={cell.id}
            onClick={() => {
              handleClick(cell.column.id, cell.row.original);
            }}
            style={{
              width: cellWidth,
              flex: `1 0 ${cellWidth}px`,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
}

export default memo(TableRow) as typeof TableRow;
