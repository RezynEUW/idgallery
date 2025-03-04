// src/app/_components/ThemeInitializer.tsx
'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    // This only runs on the client
    if (localStorage.theme === 'dark' || 
       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  return null; // This component doesn't render anything
}