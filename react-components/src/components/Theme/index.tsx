import React, { FC, useEffect, useMemo, useState } from 'react';
import { ThemeProps } from './model';

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

const THEME_KEY = 'tetacom_theme';

const ThemeContextProvider: FC<ThemeProps> = ({
  defaultTheme = '',
  postfix,
  children,
}) => {
  const storageKey = `${THEME_KEY}_${postfix}`;
  const savedValue: string =
    localStorage.getItem(storageKey) || defaultTheme || 'baselight';

  const [theme, setTheme] = useState<string>(savedValue);
  const DOMHtmlElement = useMemo(() => {
    return document.querySelector('html');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
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
