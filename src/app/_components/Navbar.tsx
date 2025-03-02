// src/app/_components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Check for dark mode preference only once on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const darkModePreference = 
        localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setIsDarkMode(darkModePreference);
      
      if (darkModePreference) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    
    if (newDarkModeState) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <button 
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? 
        <Sun className="w-5 h-5 text-amber-500" /> : 
        <Moon className="w-5 h-5 text-gray-700" />
      }
    </button>
  );
}