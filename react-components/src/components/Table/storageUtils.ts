import type { TableColumn } from './model/table-column';

export type ColumnWidth = { name: string; width: number };
type StorageTableColumn = Omit<TableColumn, 'cellComponent'>;

export function mergeSettings(
  propData: TableColumn[],
  storageData: unknown,
): TableColumn[] {
  return propData.map((propColumn) => {
    if (Array.isArray(storageData)) {
      const savedColumn: TableColumn | undefined = storageData.find(
        ({ name }) => name === propColumn.name,
      );

      if (savedColumn) {
        return { ...savedColumn, cellComponent: propColumn.cellComponent };
      }
    }

    return propColumn;
  });
}

export function separateSettings(
  dataToSave: TableColumn[],
  columnsWidth: ColumnWidth[],
): StorageTableColumn[] {
  return dataToSave.map(({ cellComponent, ...rest }) => ({
    ...rest,
    width:
      columnsWidth.find(({ name }) => name === rest.name)?.width ?? rest.width,
  }));
}
