import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/60 dark:bg-black/40 text-black dark:text-white rounded-full shadow-md backdrop-blur-md hover:scale-105 transition-all"
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeToggle;
