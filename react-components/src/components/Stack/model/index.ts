import React, { CSSProperties, PropsWithChildren } from 'react';

type DirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'stretch';
type AlignType = 'stretch' | 'start' | 'end' | 'center' | 'baseline';

export interface StackProps extends PropsWithChildren {
  // Направление
  direction?: DirectionType;

  // Выровнять элементы вдоль напправления
  justifyContent?: JustifyContent;

  // Выровнять элементы поперект направления
  align?: AlignType;

  // Расстояние между элементами
  size?: number | [number, number];

  // Установить разделитель
  divider?: boolean | React.ReactElement;

  // Автоматическая линия переноса, бывает необходима при горизонтальном направлении
  wrap?: boolean;

  // Возможность подогнать стека кнопки под ширину его родителя
  block?: boolean;

  // Дополнительный класс для Stack
  className?: string;

  // Встроенные стили
  style?: CSSProperties;
}
