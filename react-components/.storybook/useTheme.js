import { useEffect } from 'react';
import { useGlobals } from '@storybook/preview-api';

export const useTheme = (StoryFn) => {
  const [{ theme }] = useGlobals();

  useEffect(() => {
    if (!theme) {
      document.querySelector('html').classList.add('baselight');
    } else {
      document.querySelector('html').className = '';
      document.querySelector('html').classList.add(theme);
    }
  }, [theme]);

  return StoryFn();
};
