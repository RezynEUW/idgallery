// src/app/_components/FeaturedPortfolio.tsx
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

  // Generate style variables based on role
  const gradientColors = portfolio.role === 'Designer' 
    ? 'from-purple-900 via-indigo-900 to-gray-900' 
    : 'from-blue-900 via-indigo-900 to-gray-900';
  
  const accentColor = portfolio.role === 'Designer' 
    ? 'text-purple-400' 
    : 'text-blue-400';
  
  const tagColor = portfolio.role === 'Designer' 
    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
    : 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  
  const buttonClass = portfolio.role === 'Designer'
    ? 'bg-purple-600 hover:bg-purple-700'
    : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div 
      ref={containerRef}
      className={`relative w-full min-h-[600px] bg-gradient-to-br ${gradientColors} overflow-hidden`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-20">
        {imageError ? (
          <div className="w-full h-full bg-gray-800"></div>
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
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/70"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full container mx-auto px-6 py-20">
        <div className="content-wrapper md:w-1/2 text-white py-6">
          <p className={`${accentColor} text-lg font-medium mb-3 tracking-wider uppercase`}>Dagens Portfölj</p>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-sans leading-tight">{portfolio.name}</h2>
          <div className="flex items-center space-x-3 mb-8">
            <span className="bg-gray-800/80 text-gray-100 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-700">
              {formatClassId(portfolio.classYear)}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${tagColor}`}>
              {portfolio.role === 'Designer' ? 'Designer' : 'Utvecklare'}
            </span>
          </div>
          <p className="text-gray-300 mb-10 text-lg max-w-lg leading-relaxed">{portfolio.description}</p>
          
          {/* Simplified button */}
          <a 
            href={portfolio.websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${buttonClass} text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2`}
          >
            Visa Portfölj <ExternalLink size={20} />
          </a>
        </div>
        
        <div className="image-wrapper w-full md:w-1/2 p-6 mt-8 md:mt-0 block">
          <div className="rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 transform hover:-rotate-1 transition-all duration-300 backdrop-blur-sm bg-gray-900/30">
            {imageError ? (
              <div className="w-full h-80 flex items-center justify-center text-white bg-gray-800">
                <div className="text-center p-4">
                  <div className="text-2xl font-bold">{portfolio.name}</div>
                  <div className="text-lg opacity-80">{portfolio.role === 'Designer' ? 'Designer' : 'Utvecklare'}</div>
                </div>
              </div>
            ) : (
              <Image 
                src={portfolio.imageUrl} 
                alt={`${portfolio.name}s portföljskärmbild`} 
                width={650} 
                height={400}
                className="object-cover w-full h-auto"
                onError={() => setImageError(true)}
              />
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