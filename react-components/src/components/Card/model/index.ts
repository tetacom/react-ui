import React, { CSSProperties } from 'react';

export interface CardProps extends React.PropsWithChildren {
  // Дополнительный класс
  className?: string;

  // Встроенные стили
  style?: CSSProperties;
}
