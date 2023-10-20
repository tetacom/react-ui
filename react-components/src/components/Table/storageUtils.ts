import type { TableColumn } from './model/table-column';

export type LocalStorageColumn = Pick<TableColumn, 'name' | 'width'>;

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
        return {
          ...propColumn,
          ...savedColumn,
        };
      }
    }

    return propColumn;
  });
}
