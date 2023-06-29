type ColumnsType = number | number[];
type ColumnsUnitType = '%' | 'px' | 'fr';

export const defaultValues: {
  rows: number;
  columns: ColumnsType;
  columnsUnit: ColumnsUnitType;
  isTable: boolean;
} = {
  rows: 1,
  columns: 200,
  columnsUnit: 'px',
  isTable: false,
};

export interface SkeletonProps {
  // Количество строк
  rows?: number;

  // Количество стобцов
  columns?: ColumnsType;

  // Еденица измерения ширины столбцов
  columnsUnit?: ColumnsUnitType;

  // Заглушка будет показываться с шапкой, как у таблицы
  isTable?: boolean;
}
