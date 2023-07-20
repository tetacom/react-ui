import React from 'react';

export interface DividerProps {
  // Направление
  type?: 'horizontal' | 'vertical';

  // Длина
  length?: React.CSSProperties['height'];
}
