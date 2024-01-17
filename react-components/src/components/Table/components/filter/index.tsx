import { Column, Table } from '@tanstack/react-table';
import { FilterType, IDictionary } from '../../model/public-api';
import { Typography } from '../../../Typography';
import { Input } from '../../../Input';
import { Checkbox } from '../../../Checkbox';
import { Stack } from '../../../Stack';

export type FilterProps<T> = {
  columns: Array<Column<T, unknown>>;
  table: Table<T>;
  dict: IDictionary | null;
};

export function Filter<T>(props: FilterProps<T>) {
  const { columns } = props;

  return (
    <Stack block size={24} direction="column">
      {columns.map((column) => {
        const meta = column.columnDef.meta;

        const firstValue = props.table
          .getPreFilteredRowModel()
          .flatRows[0]?.getValue(column.id);

        if (
          typeof firstValue === 'number' &&
          meta?.tableColumn.filterType === FilterType.number
        ) {
          const min = column.getFacetedMinMaxValues()?.[0] ?? '';
          const max = column.getFacetedMinMaxValues()?.[1] ?? '';
          const currentValue = column.getFilterValue() as [number, number];

          return (
            <Stack key={column.id} block size={12} direction="column">
              <Typography.Text fontVariant="title3">
                {meta?.tableColumn.caption}
              </Typography.Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Input
                  placeholder={min.toString()}
                  value={currentValue?.[0] ?? ''}
                  onChange={(value) =>
                    column.setFilterValue((old: [number, number]) => [
                      value,
                      old?.[1],
                    ])
                  }
                />
                -
                <Input
                  placeholder={max.toString()}
                  value={currentValue?.[1] ?? ''}
                  onChange={(value) =>
                    column.setFilterValue((old: [number, number]) => [
                      old?.[0],
                      value,
                    ])
                  }
                />
              </div>
            </Stack>
          );
        }

        if (meta?.tableColumn.filterType === FilterType.boolean) {
          const items = [
            {
              id: 0,
              name: 'Нет',
            },
            {
              id: 1,
              name: 'Да',
            },
          ];

          const currentItems = (column.getFilterValue() as number[])?.map(
            (id) => {
              return {
                id,
                name: items?.find((item) => item.id === id)?.name || '',
              };
            },
          );

          return (
            <Stack key={column.id} block size={12} direction="column">
              <Typography.Text fontVariant="title3">
                {meta?.tableColumn.caption}
              </Typography.Text>

              <Checkbox.Group
                direction="column"
                style={{ width: '100%', height: 120, overflowY: 'auto' }}
                options={items}
                value={currentItems || items}
                onChange={(e) => {
                  const ids = e.map((_) => parseInt(_.id as string, 10));
                  column.setFilterValue(() => ids);
                }}
              />
            </Stack>
          );
        }

        if (meta?.tableColumn.filterType === FilterType.list) {
          const items = props.table.options.meta?.dictionary?.[
            meta?.tableColumn.filterField
          ]
            ?.map(({ id, name }) => {
              return {
                id: id.toString(),
                name: name,
              };
            })
            .filter(({ id }) => {
              return props.table.getPreFilteredRowModel().flatRows.some((_) => {
                return (
                  (_.original as any)[meta?.tableColumn.name] ===
                  parseInt(id, 10)
                );
              });
            });

          const currentItems = (column.getFilterValue() as number[])?.map(
            (id) => {
              return {
                id: id.toString(),
                name:
                  items?.find((item) => parseInt(item.id, 10) === id)?.name ||
                  '',
              };
            },
          );

          return (
            <Stack key={column.id} block size={12} direction="column">
              <Typography.Text fontVariant="title3">
                {meta?.tableColumn.caption}
              </Typography.Text>

              <Checkbox.Group
                direction="column"
                style={{ width: '100%', height: 200, overflowY: 'auto' }}
                options={items || []}
                value={currentItems || items}
                onChange={(e) => {
                  const ids = e.map((_) => parseInt(_.id as string, 10));
                  column.setFilterValue(() => ids);
                }}
              />
            </Stack>
          );
        }

        return null;
      })}
    </Stack>
  );
}
