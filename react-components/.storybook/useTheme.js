import { useEffect, useGlobals } from '@storybook/addons';

export const useTheme = (StoryFn) => {
  const [{ theme }] = useGlobals();

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  return StoryFn();
};
