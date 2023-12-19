import { CSSProperties } from 'react';

type ColumnsType = number | number[];
type ColumnsUnitType = '%' | 'px' | 'fr';

export const defaultValues: {
  rows: number;
  columns: ColumnsType;
  columnsUnit: ColumnsUnitType;
  isTable: boolean;
  height: CSSProperties['height'];
  gap: CSSProperties['gap'];
} = {
  rows: 1,
  columns: 200,
  columnsUnit: 'px',
  isTable: false,
  height: 'var(--spacing-16)',
  gap: 'var(--spacing-16)',
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

  // Высота блока
  height?: CSSProperties['height'];

  // Величина вертикального промежутка
  gap?: CSSProperties['gap'];
}
