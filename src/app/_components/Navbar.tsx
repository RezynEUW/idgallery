// src/app/_components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sun, Moon, Mail } from 'lucide-react';

export default function Navbar() {
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
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Super glassy background with intense blur and subtle border */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/25 dark:bg-gray-900/25 border-b border-white/20 dark:border-gray-800/30"></div>
      
      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo space */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl text-gray-900 dark:text-white">
              ID Portfolio
            </Link>
          </div>
          
          {/* Right side navigation */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/kontakt" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center transition-colors"
            >
              <Mail className="w-4 h-4 mr-1" />
              <span>Kontakt</span>
            </Link>
            
            {/* Ultra glassy button for dark mode toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full backdrop-blur-md bg-white/30 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-white/30 dark:border-gray-600/30 shadow-lg"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? 
                <Sun className="w-5 h-5 text-amber-500" /> : 
                <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}