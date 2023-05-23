import { useEffect, useGlobals } from '@storybook/addons';

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
