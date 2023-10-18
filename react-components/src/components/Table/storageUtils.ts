import type { TableColumn } from './model/table-column';

type ColumnSavedFields = { name: string; width: number };

export function mergeSettings(
  propData: TableColumn[],
  storageData: unknown,
): TableColumn[] {
  // debugger;
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

export function separateSettings(
  dataToSave: TableColumn[],
  columnsWidth: ColumnSavedFields[],
) {
  return dataToSave.map(
    ({
      cellComponent,
      caption,
      hint,
      sortable,
      sortField,
      editable,
      filterable,
      filterType,
      filterField,
      required,
      sortOrder,
      hidden,
      ...rest
    }) => ({
      ...rest,
      width:
        columnsWidth.find(({ name }) => name === rest.name)?.width ??
        rest.width,
    }),
  );
}
