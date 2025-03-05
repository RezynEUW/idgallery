'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ExternalLink, Palette, Code, Briefcase } from 'lucide-react';
import { formatClassId } from '@/lib/portfolioUtils';
import { Portfolio } from '@/types/portfolio';

interface PortfolioCardProps {
  portfolio: Portfolio;
  index: number;
}

export default function PortfolioCard({ portfolio, index }: PortfolioCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Check for dark mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkDarkMode = () => {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
      };
      
      // Initial check
      checkDarkMode();
      
      // Set up an observer to track theme changes
      const observer = new MutationObserver(() => {
        checkDarkMode();
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
      
      return () => observer.disconnect();
    }
  }, []);
  
  // Generate color scheme based on role
  const colorScheme = 
    portfolio.role === 'Designer' 
      ? {
          errorBg: 'bg-gray-200 dark:bg-gray-700',
          textIcon: isDarkMode ? 'text-green-400' : 'text-green-600',
          pillBg: isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800',
          icon: Palette
        }
      : portfolio.role === 'Utvecklare'
        ? {
            errorBg: 'bg-gray-200 dark:bg-gray-700',
            textIcon: isDarkMode ? 'text-blue-400' : 'text-blue-600',
            pillBg: isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800',
            icon: Code
          }
        : {
            errorBg: 'bg-gray-200 dark:bg-gray-700',
            textIcon: isDarkMode ? 'text-purple-400' : 'text-purple-600',
            pillBg: isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800',
            icon: Briefcase
          };

  const RoleIcon = colorScheme.icon;

  return (
    <div className="space-y-2">
      {/* Card */}
      <div 
        className={`
          group relative overflow-hidden rounded-md 
          bg-white dark:bg-gray-800 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 
          border border-gray-200 dark:border-gray-700
        `}
      >
        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden">
          {imageError ? (
            <div className={`${colorScheme.errorBg} w-full h-full flex items-center justify-center text-gray-800 dark:text-white`}>
              <div className="text-center p-4">
                <div className="text-2xl font-bold">{portfolio.name}</div>
                <div className="text-sm opacity-80">{portfolio.role}</div>
              </div>
            </div>
          ) : (
            <Image 
              src={portfolio.imageUrl} 
              alt={`${portfolio.name}'s portfolio preview`} 
              fill 
              className={`
                object-cover transition-all duration-300 
                ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                group-hover:scale-105
              `}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              priority={index < 12}
            />
          )}

          {/* Overlay Gradient - adjusted for light/dark mode */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent to-[60%] via-transparent" />

          {/* Overlay Name and Portfolio Link */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {portfolio.name}
            </h3>
            <a 
              href={portfolio.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View portfolio"
            >
              <ExternalLink className="h-5 w-5 text-white drop-shadow-lg hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Info section completely outside of the card */}
      <div className="flex items-center justify-between py-1 px-1">
        {/* Class Year pill */}
        <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium">
          {formatClassId(portfolio.classYear)}
        </span>
        
        {/* Role with icon - colors adjusted */}
        <div className="flex items-center gap-1.5">
          <RoleIcon className={`w-4 h-4 ${colorScheme.textIcon}`} />
          <span className={`text-xs font-medium ${colorScheme.pillBg} px-2 py-1 rounded-full`}>
            {portfolio.role}
          </span>
        </div>
      </div>
    </div>
  );
}