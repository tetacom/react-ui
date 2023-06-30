export interface Slider {
  // Начальные позиции поинтов
  values: Array<number>;

  // Минимальное значение
  min: number;

  // Максимальное значение
  max: number;

  // Шаг
  step: number;

  onMouseUp?: () => void;

  onChange?: (values: Array<number>) => void;
}
