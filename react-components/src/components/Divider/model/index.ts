import React from 'react';

export interface DividerProps {
  // Направление
  type?: 'horizontal' | 'vertical';

  // Высота
  height?: React.CSSProperties['height'];
}
