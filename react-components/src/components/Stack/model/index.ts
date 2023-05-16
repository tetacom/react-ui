import { CSSProperties, PropsWithChildren } from 'react';

type DirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type AlignType = 'stretch' | 'start' | 'end' | 'center' | 'baseline';

export interface StackProps extends PropsWithChildren {
  // Направление
  direction?: DirectionType;

  // Выровнять элементы
  align?: AlignType;

  // Расстояние между элементами
  size?: number | [number, number];

  // Установить разделитель
  divider?: boolean;

  // Автоматическая линия переноса, бывает необходима при горизонтальном направлении
  wrap?: boolean;

  // Возможность подогнать стека кнопки под ширину его родителя
  block?: boolean;

  // Дополнительный класс для Stack
  className?: string;
  style?: CSSProperties;
}
