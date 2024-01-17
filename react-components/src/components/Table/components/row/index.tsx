import React, { memo } from 'react';
import { Cell, flexRender, Row, Table } from '@tanstack/react-table';
import classNames from 'classnames';
import { sha1 } from 'object-hash';

import { TableProps } from '../../model';
import { LockedColumn } from '../../model/public-api';
import { lockedClasses } from '../../helpers';
import { LockedColumnType } from '../../useStickyStyles';

import s from '../../style.module.scss';

export interface ITableRow<T> {
  virtualIndex: number;
  row: Row<T>;
  table: Table<T>;
  isSelectedRow?: boolean;
  rowRef: (node: Element | null) => void;
  acrossLine?: TableProps<T>['acrossLine'];
  lockedColumnsVariables: Map<string, LockedColumnType>;
}

function TableCell<T>({
  cell,
  lockedColumnsVariables,
}: {
  cell: Cell<T, unknown>;
  width: number;
  isEdit: boolean;
  lockedColumnsVariables: Map<string, LockedColumnType>;
  hash: string;
}) {
  const cellComponent = cell.column.columnDef.cell;
  const isCustomCell = Boolean(
    cell.column.columnDef.meta?.tableColumn.cellComponent,
  );
  const columnLockedData = lockedColumnsVariables.get(cell.column.id);
  const cellLocked = columnLockedData?.lockedValue ?? LockedColumn.none;

  let stickyClasses = '';
  if (columnLockedData?.isExtreme) {
    if (cellLocked === LockedColumn.left) {
      stickyClasses = s.lockedBodyLeftLast;
    } else if (cellLocked === LockedColumn.right) {
      stickyClasses = s.lockedBodyRightFirst;
    }
  }

  return (
    <td
      key={cell.id}
      data-column={cell.column.id}
      data-row={cell.row.id}
      className={classNames(
        lockedClasses[cellLocked]?.body,
        stickyClasses,
        isCustomCell && s.resetPadding,
      )}
      style={columnLockedData?.variables}
    >
      <div className={s.tdContent}>
        {flexRender(cellComponent, cell.getContext())}
      </div>
    </td>
  );
}

const MemoTableCell = memo(TableCell, (prevProps, nextProps) => {
  const nextContext = nextProps.cell.getContext();

  const nextContextLocked =
    nextContext.column.columnDef.meta?.tableColumn.locked;
  let lockedEquals = true;

  if (
    nextContextLocked === LockedColumn.left ||
    nextContextLocked === LockedColumn.right
  ) {
    lockedEquals =
      sha1(
        nextProps.lockedColumnsVariables.get(nextProps.cell.column.id) ?? null,
      ) ===
      sha1(
        prevProps.lockedColumnsVariables.get(prevProps.cell.column.id) ?? null,
      );
  }

  return (
    prevProps.width === nextProps.width &&
    prevProps.isEdit === nextProps.isEdit &&
    prevProps.hash === nextProps.hash &&
    lockedEquals
  );
}) as typeof TableCell;

function TableRow<T>({
  virtualIndex,
  table,
  row,
  isSelectedRow = false,
  rowRef,
  acrossLine = false,
  lockedColumnsVariables,
}: ITableRow<T>) {
  const { toggleSelected, getVisibleCells } = row;

  const handleClick = () => {
    toggleSelected(true);
  };

  const rowsClassName = acrossLine
    ? (row.index % 2 && s.highlight) || ''
    : s.underline;

  const rowHash = sha1(row.original as object);

  return (
    <tr
      ref={rowRef}
      className={classNames(rowsClassName, isSelectedRow && s.active)}
      data-index={virtualIndex}
      onClick={handleClick}
    >
      {getVisibleCells().map((cell) => {
        const cellWidth = cell.column.getSize();

        const isEdit =
          table.options.meta?.currentEditCell?.row === parseInt(cell.row.id) &&
          table.options.meta?.currentEditCell?.column === cell.column.id;

        return (
          <MemoTableCell
            key={cell.id}
            isEdit={isEdit}
            cell={cell}
            hash={rowHash}
            width={cellWidth}
            lockedColumnsVariables={lockedColumnsVariables}
          />
        );
      })}
    </tr>
  );
}
export default TableRow as typeof TableRow;
