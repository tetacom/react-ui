import React from "react";
import { useTheme } from './useTheme';

import '../src/style/sb.css';
import '../src/style/tokens/tokens.css';
import '../src/style/common.css';

export const globalTypes = {
  theme: {
    name: 'Toggle theme',
    description: 'Global theme for components',
    defaultValue: 'baselight',
    toolbar: {
      icon: 'circlehollow',
      items: ['baselight', 'basedark'],
      name: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [useTheme];