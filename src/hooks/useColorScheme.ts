import { createContext, useContext, useState, useCallback, createElement } from 'react';
import type { ReactNode } from 'react';

type ColorScheme = 'light' | 'dark';

const LS_KEY = 'dd-color-scheme';

interface ColorSchemeContextValue {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  colorScheme: 'dark',
  toggleColorScheme: () => {},
});

function getInitialScheme(): ColorScheme {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch { /* private browsing */ }
  return 'dark';
}

function applyScheme(scheme: ColorScheme) {
  document.documentElement.setAttribute('data-color-scheme', scheme);
  try { localStorage.setItem(LS_KEY, scheme); }
  catch { /* private browsing */ }
}

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(getInitialScheme);

  const toggleColorScheme = useCallback(() => {
    setColorScheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyScheme(next);
      return next;
    });
  }, []);

  return createElement(
    ColorSchemeContext.Provider,
    { value: { colorScheme, toggleColorScheme } },
    children,
  );
}

export function useColorScheme() {
  return useContext(ColorSchemeContext);
}
