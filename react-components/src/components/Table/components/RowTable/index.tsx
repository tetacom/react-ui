import React, { memo } from 'react';
import { flexRender, Row } from '@tanstack/react-table';
import classNames from 'classnames';

import s from '../../style.module.scss';

export interface ITableRow<T> {
  row: Row<T>;
  isSelectedRow?: boolean;
  onClick?: (
    row: Row<T>['original'],
    event?: React.MouseEvent<HTMLElement>,
  ) => void;
}

function TableRow<T>({ row, isSelectedRow = false, onClick }: ITableRow<T>) {
  const { toggleSelected, getVisibleCells } = row;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    toggleSelected();
    onClick && onClick(row.original, event);
  };

  return (
    <tr className={classNames(isSelectedRow && s.active)} onClick={handleClick}>
      {getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}

export default memo(TableRow) as typeof TableRow;
