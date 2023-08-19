import type { TableColumn } from './model/table-column';

// TODO подумать как переделать

export type ColumnWidth = { name: string; width: number };
type StorageTableColumn = Omit<
  TableColumn,
  | 'cellComponent'
  | 'caption'
  | 'hint'
  | 'sortable'
  | 'sortField'
  | 'editable'
  | 'filterable'
  | 'filterType'
  | 'filterField'
  | 'required'
  | 'sortOrder'
>;

export function mergeSettings(
  propData: TableColumn[],
  storageData: unknown,
): TableColumn[] {
  return propData.map((propColumn) => {
    if (Array.isArray(storageData)) {
      const savedColumn: TableColumn | undefined = storageData.find(
        ({ name }) => name === propColumn.name,
      );
      const {
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
      } = propColumn;

      if (savedColumn) {
        return {
          ...savedColumn,
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
        };
      }
    }

    return propColumn;
  });
}

export function separateSettings(
  dataToSave: TableColumn[],
  columnsWidth: ColumnWidth[],
): StorageTableColumn[] {
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
      ...rest
    }) => ({
      ...rest,
      width:
        columnsWidth.find(({ name }) => name === rest.name)?.width ??
        rest.width,
    }),
  );
}
