import React, { memo } from 'react';
import { flexRender, Row } from '@tanstack/react-table';
import classNames from 'classnames';

import s from '../../style.module.scss';
import { TableProps } from '../../model';
import { TableColumn } from 'tetacom/react-components';

export interface ITableRow<T> {
  row: Row<T>;
  columns: TableProps<T>['columns'];
  isSelectedRow?: boolean;
  onClick?: (row: Row<T>['original'], column?: TableColumn) => void;
}

function TableRow<T>({
  row,
  columns,
  isSelectedRow = false,
  onClick,
}: ITableRow<T>) {
  const { toggleSelected, getVisibleCells } = row;

  const handleClick = (columnId: string, row: T) => {
    toggleSelected();

    const column = columns.find((item) => item.name === columnId);
    onClick && onClick(row, column);
  };

  return (
    <tr className={classNames(isSelectedRow && s.active)}>
      {getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          onClick={() => {
            handleClick(cell.column.id, cell.row.original);
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}

export default memo(TableRow) as typeof TableRow;
