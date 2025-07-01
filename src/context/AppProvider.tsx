
import React, { useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeContext } from './ThemeContext';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  const styles = {
    backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
    color: theme === 'dark' ? '#f5f5f5' : '#121212',
    transition: 'background-color 0.5s, color 0.5s',
    minHeight: '100vh',
    width: '100%',
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={styles}>
        <ThemeToggle />
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default AppProvider;
