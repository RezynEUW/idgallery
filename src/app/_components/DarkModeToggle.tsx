'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Mail, Search } from 'lucide-react';

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
  };
  
  // Smooth scroll to search section at 20vh
  const scrollToSearch = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const searchPosition = window.innerHeight * 0.82; // 20vh
    window.scrollTo({
      top: searchPosition,
      behavior: 'smooth'
    });
  }, []);
  
  // Smooth scroll to footer
  const scrollToFooter = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Super glassy background with intense blur - border removed */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5 dark:bg-gray-900/25"></div>
      
      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo space - full height, text removed */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center h-20">
              <div className="relative h-full py-4 w-auto aspect-square">
                {/* Enhanced glow effect for dark mode */}
                <div className="absolute inset-0 rounded-full bg-white/30 blur-xl dark:opacity-50 opacity-0 transition-opacity duration-300"></div>
                <Image 
                  src="/images/logo.png" 
                  alt="ID Portfolio Logo"
                  fill
                  className="object-contain drop-shadow-lg transition-all duration-300"
                  priority
                />
              </div>
            </Link>
          </div>
          
          {/* Right side navigation - icons only */}
          <div className="flex items-center space-x-8">
            <a 
              href="#search"
              onClick={scrollToSearch}
              aria-label="Search" 
              className="p-2 hover:scale-110 transition-transform duration-300 drop-shadow-md"
            >
              <Search className="w-6 h-6 text-gray-900 dark:text-white transition-colors duration-300" />
            </a>
            
            <a 
              href="#footer"
              onClick={scrollToFooter}
              aria-label="Contact"
              className="p-2 hover:scale-110 transition-transform duration-300 drop-shadow-md"
            >
              <Mail className="w-6 h-6 text-gray-900 dark:text-white transition-colors duration-300" />
            </a>
            
            {/* Dark mode toggle - icon only */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 hover:scale-110 transition-transform duration-300 drop-shadow-md"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? 
                <Sun className="w-6 h-6 text-amber-500 transition-all duration-300" /> : 
                <Moon className="w-6 h-6 text-indigo-900 dark:text-indigo-400 transition-all duration-300" />
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}