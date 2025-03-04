// src/app/_components/PortfolioCard.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ExternalLink, Palette, Code } from 'lucide-react';
import { formatClassId } from '@/lib/portfolioUtils';
import { Portfolio } from '@/types/portfolio';

interface PortfolioCardProps {
  portfolio: Portfolio;
  index: number;
}

export default function PortfolioCard({ portfolio, index }: PortfolioCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Generate color scheme based on role
  const colorScheme = portfolio.role === 'Designer' 
    ? {
        bg: 'bg-purple-500',
        border: 'border-purple-200 dark:border-purple-900',
        textHover: 'text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300',
        pillBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
        icon: Palette
      }
    : {
        bg: 'bg-blue-500',
        border: 'border-blue-200 dark:border-blue-900',
        textHover: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300',
        pillBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
        icon: Code
      };

  const RoleIcon = colorScheme.icon;

  return (
    <div className="space-y-2">
      {/* Card */}
      <div 
        className={`
          group relative overflow-hidden rounded-2xl 
          bg-white dark:bg-gray-800 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 
          border-2 ${colorScheme.border}
        `}
      >
        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden">
          {imageError ? (
            <div className={`${colorScheme.bg} w-full h-full flex items-center justify-center text-white`}>
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

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-[60%] via-transparent" />

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
      <div className="flex items-center justify-between px-1">
        {/* Class Year pill */}
        <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium">
          {formatClassId(portfolio.classYear)}
        </span>
        
        {/* Role with icon */}
        <div className="flex items-center gap-1.5">
          <RoleIcon className={`w-4 h-4 ${portfolio.role === 'Designer' ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'}`} />
          <span className={`text-xs font-medium ${colorScheme.pillBg} px-2 py-1 rounded-full`}>
            {portfolio.role === 'Designer' ? 'Designer' : 'Utvecklare'}
          </span>
        </div>
      </div>
    </div>
  );
}