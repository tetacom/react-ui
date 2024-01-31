import { useTheme } from './useTheme';
import { useDayjsLocale } from './useDayjsLocale';
import { useSvgAssets } from './useSvgAssets';

import '../src/style/fonts.css';
import '../src/style/normalize.css';
import '../src/style/common.css';
import '../src/style/globalTokens.css';
import '../src/style/tokens.scss';
import '../src/style/scrollbar.css';

export const globalTypes = {
  theme: {
    name: 'Toggle theme',
    description: 'Global theme for components',
    defaultValue: 'baselight',
    toolbar: {
      icon: 'circlehollow',
      items: [
        'baselight',
        'basedark',
        'tatneftlight',
        'tatneftdark',
        'greenlight',
        'greendark',
      ],
      name: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [useTheme, useDayjsLocale, useSvgAssets];
