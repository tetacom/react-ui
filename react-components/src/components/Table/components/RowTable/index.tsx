import React, { memo } from 'react';
import { Cell, flexRender, Row, Table } from '@tanstack/react-table';
import classNames from 'classnames';

import { TableProps } from '../../model';
import { ICellInstance } from '../../model/public-api';

import s from '../../style.module.scss';

export interface ITableRow<T> {
  virtualIndex: number;
  row: Row<T>;
  table: Table<T>;
  columns: TableProps<T>['columns'];
  isSelectedRow?: boolean;
  onClick?: (cell: ICellInstance<T>) => void;
  rowRef: (node: Element | null) => void;
  acrossLine?: TableProps<T>['acrossLine'];
}

function TableCell<T>({
  cell,
  width,
}: {
  cell: Cell<T, unknown>;
  width: number;
  isEdit: boolean;
}) {
  const cellComponent = cell.column.columnDef.cell;

  return (
    <td
      key={cell.id}
      data-column={cell.column.id}
      data-row={cell.row.id}
      style={{
        width,
        flex: `1 0 ${width}px`,
      }}
    >
      {flexRender(cellComponent, cell.getContext())}
    </td>
  );
}

const MemoTableCell = memo(TableCell, (prevProps, nextProps) => {
  const nextContext = nextProps.cell.getContext();
  const prevContext = prevProps.cell.getContext();

  return (
    prevProps.width === nextProps.width &&
    prevContext.getValue() === nextContext.getValue() &&
    prevProps.isEdit === nextProps.isEdit
  );
}) as typeof TableCell;

function TableRow<T>({
  virtualIndex,
  table,
  row,
  isSelectedRow = false,
  rowRef,
  acrossLine = false,
}: ITableRow<T>) {
  const { toggleSelected, getVisibleCells } = row;

  const handleClick = () => {
    toggleSelected(true);
  };

  const rowsClassName = acrossLine
    ? (row.index % 2 && s.highlight) || ''
    : s.underline;

  return (
    <tr
      ref={rowRef}
      className={classNames(rowsClassName, isSelectedRow && s.active)}
      data-index={virtualIndex}
      onClick={handleClick}
    >
      {getVisibleCells().map((cell, index) => {
        const cellWidth = cell.column.getSize();

        const isEdit =
          table.options.meta?.currentEditCell?.row === parseInt(cell.row.id) &&
          table.options.meta?.currentEditCell?.column === cell.column.id;

        return (
          <MemoTableCell
            key={cell.id}
            isEdit={isEdit}
            cell={cell}
            width={cellWidth}
          />
        );
      })}
    </tr>
  );
}
export default TableRow as typeof TableRow;
