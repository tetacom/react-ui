import React, { FC, useEffect, useMemo, useState } from 'react';

import { ThemeProps } from './model';
import { useLocalStorage } from '../../utils/useLocalStorage';

export interface ThemeContextData {
  theme: string;
  changeTheme: (selectedTheme: string) => void;
}

const ThemeContext = React.createContext<ThemeContextData>({
  theme: '',
  changeTheme: () => {
    throw new Error('changeTheme not implemented');
  },
});

const THEME_KEY = '_tetacom_theme';

const ThemeContextProvider: FC<ThemeProps> = ({
  defaultTheme = '',
  localStorageKey,
  children,
}) => {
  const storageKey = `${localStorageKey}${THEME_KEY}`;
  const [savedValue, setValue] = useLocalStorage<string>(
    storageKey,
    defaultTheme || 'baselight',
  );

  const [theme, setTheme] = useState<string>(savedValue);
  const DOMHtmlElement = useMemo(() => {
    return document.querySelector('html');
  }, [theme]);

  useEffect(() => {
    if (DOMHtmlElement) {
      DOMHtmlElement.classList.remove(
        ...Object.values(DOMHtmlElement.classList),
      );
      DOMHtmlElement.classList.add(theme);
    }
  }, [theme, DOMHtmlElement]);

  const themeContextValue: ThemeContextData = useMemo(() => {
    return {
      theme,
      changeTheme: (selectedTheme: string) => {
        setTheme(selectedTheme);
        setValue(theme);
      },
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const Theme = {
  Context: ThemeContext,
  Provider: ThemeContextProvider,
};
