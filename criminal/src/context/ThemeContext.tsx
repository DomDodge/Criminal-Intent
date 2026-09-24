import React, { createContext, useContext, useState } from 'react';

type ThemeContextType = {
  themeColor: string;
  setThemeColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  themeColor: '#ffffff',
  setThemeColor: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState('#ffffff'); // Default: White

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for consuming theme state inside any screen
export function useTheme() {
  return useContext(ThemeContext);
}