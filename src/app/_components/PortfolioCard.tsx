// src/app/_components/PortfolioCard.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { formatClassId } from '@/lib/portfolioUtils';
import { Portfolio } from '@/types/portfolio';

interface PortfolioCardProps {
  portfolio: Portfolio;
  index: number;
}

export default function PortfolioCard({ portfolio, index }: PortfolioCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Generate background color based on role for fallback
  const bgColor = portfolio.role === 'Designer' ? 'bg-purple-500' : 'bg-blue-500';
  const borderColor = portfolio.role === 'Designer' ? 'border-purple-200 dark:border-purple-900' : 'border-blue-200 dark:border-blue-900';
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border-2 ${borderColor}`}>
      <div className="relative h-52 overflow-hidden">
        {imageError ? (
          <div className={`${bgColor} w-full h-full flex items-center justify-center text-white`}>
            <div className="text-center p-4">
              <div className="text-xl font-bold">{portfolio.name}</div>
              <div className="text-sm opacity-80">{portfolio.role}</div>
            </div>
          </div>
        ) : (
          <Image 
            src={portfolio.imageUrl} 
            alt={`${portfolio.name}'s portfolio preview`} 
            fill 
            className={`object-cover transition-all duration-300 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} hover:scale-105`}
            style={{ objectFit: 'cover' }}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            loading="eager"
            priority={index < 12}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <span className="bg-gray-100/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {formatClassId(portfolio.classYear)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            portfolio.role === 'Designer' 
              ? 'bg-purple-100/90 dark:bg-purple-900/90 text-purple-800 dark:text-purple-300' 
              : 'bg-blue-100/90 dark:bg-blue-900/90 text-blue-800 dark:text-blue-300'
          }`}>
            {portfolio.role}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{portfolio.name}</h3>
        <a 
          href={portfolio.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`mt-2 inline-flex items-center gap-1.5 font-medium ${
            portfolio.role === 'Designer' 
              ? 'text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300' 
              : 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
          }`}
        >
          View portfolio
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}