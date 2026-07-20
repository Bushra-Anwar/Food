import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    name: 'Default Dark',
    colors: {
      '--bg-color': '#121212',
      '--text-main': '#ffffff',
      '--glass-bg': 'rgba(255, 255, 255, 0.05)',
      '--glass-border': 'rgba(255, 255, 255, 0.1)',
      '--primary': '#4CAF50',
      '--sidebar-bg': '#1e1e1e',
    }
  },
  mcdonalds: {
    name: 'Fast Food Red',
    colors: {
      '--bg-color': '#db0007',
      '--text-main': '#ffffff',
      '--glass-bg': 'rgba(255, 199, 44, 0.9)',
      '--glass-border': 'rgba(255, 255, 255, 0.2)',
      '--primary': '#ffc72c',
      '--sidebar-bg': '#b00005',
    }
  },
  luxury: {
    name: 'Luxury Gold',
    colors: {
      '--bg-color': '#000000',
      '--text-main': '#d4af37',
      '--glass-bg': 'rgba(212, 175, 55, 0.1)',
      '--glass-border': 'rgba(212, 175, 55, 0.3)',
      '--primary': '#d4af37',
      '--sidebar-bg': '#0a0a0a',
    }
  },
  ocean: {
    name: 'Ocean Blue',
    colors: {
      '--bg-color': '#0f172a',
      '--text-main': '#e2e8f0',
      '--glass-bg': 'rgba(14, 165, 233, 0.1)',
      '--glass-border': 'rgba(14, 165, 233, 0.2)',
      '--primary': '#0ea5e9',
      '--sidebar-bg': '#1e293b',
    }
  },
  neon: {
    name: 'Dark Neon',
    colors: {
      '--bg-color': '#09090b',
      '--text-main': '#f4f4f5',
      '--glass-bg': 'rgba(217, 70, 239, 0.1)',
      '--glass-border': 'rgba(217, 70, 239, 0.3)',
      '--primary': '#d946ef',
      '--sidebar-bg': '#18181b',
    }
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    const theme = themes[currentTheme];
    if (theme) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
