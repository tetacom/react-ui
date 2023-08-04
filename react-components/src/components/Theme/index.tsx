import React, { FC, useEffect, useMemo, useState } from 'react';
import { ThemeProps } from './model';

const DOMHtmlElement = document.querySelector('html');

export interface ThemeContextData {
  mode: string;
  toggleMode: (selectedMode: string) => void;
}

const ThemeContext = React.createContext<ThemeContextData>({
  mode: 'baselight',
  toggleMode: () => {
    throw new Error('ToggleMode not implemented');
  },
});

const MODE_KEY = 'tetacom_theme_mode';

const ThemeContextProvider: FC<ThemeProps> = ({ defaultTheme, children }) => {
  const savedValue: string =
    localStorage.getItem(MODE_KEY) || defaultTheme || 'baselight';

  const [mode, setMode] = useState<string>(savedValue);

  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (DOMHtmlElement) {
      DOMHtmlElement.classList.remove(
        ...Object.values(DOMHtmlElement.classList),
      );
      DOMHtmlElement.classList.add(mode);
    }
  }, [mode]);

  const themeContextValue: ThemeContextData = useMemo(() => {
    return {
      mode,
      toggleMode: (selectedMode: string) => {
        setMode(selectedMode);
      },
    };
  }, [mode]);

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
