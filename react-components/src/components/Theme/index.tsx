import React, { FC, useEffect, useMemo, useState } from 'react';
import { ThemeProps } from './model';

export interface ThemeContextData {
  theme: string;
  toggleTheme: (selectedTheme: string) => void;
}

const ThemeContext = React.createContext<ThemeContextData>({
  theme: 'baselight',
  toggleTheme: () => {
    throw new Error('ToggleTheme not implemented');
  },
});

const THEME_KEY = 'tetacom_theme_theme';

const ThemeContextProvider: FC<ThemeProps> = ({ defaultTheme, children }) => {
  const savedValue: string =
    localStorage.getItem(THEME_KEY) || defaultTheme || 'baselight';

  const [theme, setTheme] = useState<string>(savedValue);
  const DOMHtmlElement = useMemo(() => {
    return document.querySelector('html');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    console.log('DOMHtmlElement', DOMHtmlElement);
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
      toggleTheme: (selectedTheme: string) => {
        setTheme(selectedTheme);
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
