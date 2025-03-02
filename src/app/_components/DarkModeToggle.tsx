// src/app/_components/DarkModeToggle.tsx
'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Check for dark mode preference on mount
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
    
    // Force a re-render of the page with the new theme
    document.body.classList.toggle('dark-mode-transition');
    
    // Log to confirm the action
    console.log('Dark mode toggled:', newDarkModeState);
    console.log('HTML classes:', document.documentElement.classList.toString());
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