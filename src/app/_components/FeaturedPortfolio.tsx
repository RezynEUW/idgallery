'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { formatClassId } from '@/lib/portfolioUtils';
import { Portfolio } from '@/types/portfolio';

interface FeaturedPortfolioProps {
  portfolio: Portfolio | null;
}

export default function FeaturedPortfolio({ portfolio }: FeaturedPortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRan = useRef(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      const darkModePreference = 
        localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
        window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setIsDarkMode(darkModePreference);
      
      // Listen for theme changes
      const observer = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
      
      return () => observer.disconnect();
    }
  }, []);
  
  useEffect(() => {
    if (containerRef.current && portfolio && !animationRan.current) {
      const tl = gsap.timeline();
      
      tl.from(containerRef.current.querySelector('.content-wrapper'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(containerRef.current.querySelector('.image-wrapper'), {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");
      
      animationRan.current = true;
    }
  }, [portfolio]);
  
  if (!portfolio) return null;

  // Get role-specific colors
  const getRoleColors = (role: string) => {
    if (role === 'Designer') {
      return {
        dark: {
          gradient: 'from-green-900 via-green-800 to-gray-900',
          accent: 'text-green-400',
          tag: 'bg-green-500/30 text-green-300 border-green-500/40'
        },
        light: {
          accent: 'text-green-600',
          tag: 'bg-green-500/20 text-green-700 border-green-500/40'
        }
      };
    } else if (role === 'Utvecklare') {
      return {
        dark: {
          gradient: 'from-blue-900 via-blue-800 to-gray-900',
          accent: 'text-blue-400',
          tag: 'bg-blue-500/30 text-blue-300 border-blue-500/40'
        },
        light: {
          accent: 'text-blue-600',
          tag: 'bg-blue-500/20 text-blue-700 border-blue-500/40'
        }
      };
    } else {
      // For "Annat"
      return {
        dark: {
          gradient: 'from-purple-900 via-purple-800 to-gray-900',
          accent: 'text-purple-400',
          tag: 'bg-purple-500/30 text-purple-300 border-purple-500/40'
        },
        light: {
          accent: 'text-purple-600',
          tag: 'bg-purple-500/20 text-purple-700 border-purple-500/40'
        }
      };
    }
  };

  const roleColors = getRoleColors(portfolio.role);
  
  // Choose colors based on theme
  const gradientColors = isDarkMode ? roleColors.dark.gradient : 'from-orange-50 via-orange-50 to-orange-100';
  const tagColor = isDarkMode ? roleColors.dark.tag : roleColors.light.tag;
  
  // Red accent color for "Dagens portfölj"
  const redAccentColor = isDarkMode ? 'text-red-500' : 'text-red-600';
  
  // Red button gradient
  const buttonColors = isDarkMode 
    ? 'bg-gradient-to-r from-red-500 to-red-500 hover:from-red-700 hover:to-red-600' 
    : 'bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500';
  
  // Class tag colors (red)
  const classTagColor = isDarkMode 
    ? 'bg-red-500/40 text-red-200 border-red-500/50' 
    : 'bg-red-500/20 text-red-700 border-red-500/40';
  
  // Text colors based on theme
  const textPrimaryColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondaryColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const backgroundOverlay = isDarkMode 
    ? 'bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/70' 
    : 'bg-gradient-to-r from-orange-50/50 via-orange-50/40 to-orange-100/30';

  return (
    <div 
      ref={containerRef}
      className={`relative w-full min-h-[700px] py-30 bg-gradient-to-br ${gradientColors} overflow-hidden`}
      style={!isDarkMode ? {backgroundColor: 'rgb(253, 242, 231)'} : {}}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>
      
      {/* Background image with overlay */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}>
        {imageError ? (
          <div className={`w-full h-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
        ) : (
          <Image 
            src={portfolio.imageUrl} 
            alt={`${portfolio.name}s portfölj`} 
            fill 
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${backgroundOverlay}`}></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full container mx-auto px-6 py-24">
        <div className="content-wrapper md:w-1/2 py-6">
          <p className={`${redAccentColor} text-lg font-medium mb-3 tracking-wider uppercase`}>Dagens Portfölj</p>
          <h2 className={`${textPrimaryColor} text-5xl md:text-6xl font-bold mb-6 font-sans leading-tight`}>{portfolio.name}</h2>
          <div className="flex items-center space-x-3 mb-8">
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${classTagColor}`}>
              {formatClassId(portfolio.classYear)}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${tagColor}`}>
              {portfolio.role}
            </span>
          </div>
          <p className={`${textSecondaryColor} mb-10 text-lg max-w-lg leading-relaxed`}>{portfolio.description}</p>
          
          {/* Button with pure red gradient */}
          <a 
            href={portfolio.websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`
              ${buttonColors} text-white px-8 py-4 rounded-md text-lg font-medium 
              shadow-lg hover:shadow-xl transition-all duration-300 
              inline-flex items-center gap-2 relative overflow-hidden group
            `}
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              Besök <ExternalLink size={20} />
            </span>
            <span className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
        
        <div className="image-wrapper w-full md:w-1/2 p-6 mt-8 md:mt-0 block">
          <div className="relative rounded-md shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
            {/* Border overlay with role color */}
            <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'opacity-30' : 'opacity-20'} z-10`}>
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${isDarkMode ? roleColors.dark.accent.replace('text', 'bg') : roleColors.light.accent.replace('text', 'bg')}`}></div>
            </div>
            
            {imageError ? (
              <div className={`w-full aspect-video flex items-center justify-center ${textPrimaryColor} ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold">{portfolio.name}</div>
                  <div className="text-lg opacity-80">{portfolio.role}</div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video w-full">
                <Image 
                  src={portfolio.imageUrl} 
                  alt={`${portfolio.name}s portföljskärmbild`} 
                  fill
                  className="object-cover brightness-[1.02] contrast-[1.02]"
                  onError={() => setImageError(true)}
                />
                
                {/* Subtle gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Section transition with wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto transform translate-y-[1px]">
          <path 
            fill="#f9fafb" 
            fillOpacity="1" 
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,90.7C672,107,768,117,864,106.7C960,96,1056,64,1152,58.7C1248,53,1344,75,1392,85.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            className="dark:fill-gray-900 fill-gray-50"
          ></path>
        </svg>
      </div>
    </div>
  );
}