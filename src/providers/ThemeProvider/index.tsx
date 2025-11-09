import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from '@/constants/colors';

interface ThemeContextProps {
  isDark: boolean;
  colors: typeof lightColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  isDark: true,
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    (async () => {
      const val = await AsyncStorage.getItem('isDarkMode');
      if (val !== null) setIsDark(val === 'true');
      else await AsyncStorage.setItem('isDarkMode', 'true');
    })();
  }, []);

  const toggleTheme = async () => {
    setIsDark(prev => !prev);
    await AsyncStorage.setItem('isDarkMode', !isDark ? 'true' : 'false');
  };

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
