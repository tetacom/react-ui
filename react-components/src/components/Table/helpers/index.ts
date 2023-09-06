import { FilterType } from '../model/public-api';
import { StringCell } from '../components/default/StringCell';
import { SelectCell } from '../components/default/SelectCell';
import { ICellEvent } from '../model/i-cell-event';
import { CustomCellComponent } from '../model/cell-component';

const cellComponentsMap: Map<FilterType, CustomCellComponent> = new Map<
  FilterType,
  CustomCellComponent
>()
  .set(FilterType.string, StringCell)
  .set(FilterType.list, SelectCell);

export const getCellComponent = (filterType: FilterType) =>
  cellComponentsMap.has(filterType)
    ? cellComponentsMap.get(filterType)
    : StringCell;

export function findCell(event: Event): HTMLElement | null {
  return event.composedPath().find((target: any) => {
    return target.tagName?.toLowerCase() === 'td';
  }) as HTMLElement;
}

export function getCoordinates(event: Event): ICellEvent | null {
  const cell = findCell(event);
  if (cell) {
    const rowIndex = parseInt(cell.getAttribute('data-row')!, 10);
    const columnName = cell.getAttribute('data-column')!;

    if (rowIndex >= 0 && columnName) {
      return {
        event,
        row: rowIndex,
        column: columnName,
      };
    }
  }
  return null;
}

export function eventIsOnRow(event: Event): boolean {
  const row = event.composedPath().find((target) => {
    return (target as HTMLElement)?.getAttribute?.('data-row');
  });

  return Boolean(row);
}
