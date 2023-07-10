import React, { memo } from 'react';
import { flexRender, Row } from '@tanstack/react-table';
import classNames from 'classnames';

import { TableProps } from '../../model';
import { ICellInstance } from 'tetacom/react-components';

import s from '../../style.module.scss';

export interface ITableRow<T> {
  row: Row<T>;
  columns: TableProps<T>['columns'];
  isSelectedRow?: boolean;
  onClick?: (cell: ICellInstance<T>) => void;
  rowRef: (node: Element | null) => void;
}

function TableRow<T>({
  row,
  columns,
  isSelectedRow = false,
  onClick,
  rowRef,
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

  return (
    <tr ref={rowRef} className={classNames(isSelectedRow && s.active)}>
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

export default memo(TableRow) as typeof TableRow;
