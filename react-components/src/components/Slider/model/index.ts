import { SliderPoint } from './point';

export interface SliderProps {
  // Начальные позиции поинтов
  values: Array<SliderPoint>;

  // Минимальное значение
  min: number;

  // Максимальное значение
  max: number;

  // Шаг
  step: number;

  // Обратный вызов при изменений значений слайдера
  onChange?: (values: Array<SliderPoint>) => void;

  // Расположение подсказки
  tooltipPlacement?: 'top' | 'bottom';
}
