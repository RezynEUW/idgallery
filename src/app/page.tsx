// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import FeaturedPortfolio from './_components/FeaturedPortfolio';
import PortfolioGrid from './_components/PortfolioGrid';
import portfolios from '@/data/portfolios.json';
import { Portfolio } from '@/types/portfolio';

export default function Home() {
  const [featuredPortfolio, setFeaturedPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function fetchFeaturedPortfolio() {
      try {
        const response = await fetch('/api/random-feature');
        const data = await response.json();
        
        if (data.success) {
          setFeaturedPortfolio(data.portfolio);
        } else {
          // Fallback: select first portfolio if API fails
          setFeaturedPortfolio(portfolios[0] as Portfolio);
        }
      } catch (error) {
        console.error('Error fetching featured portfolio:', error);
        setFeaturedPortfolio(portfolios[0] as Portfolio);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchFeaturedPortfolio();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <main>
      {featuredPortfolio && <FeaturedPortfolio portfolio={featuredPortfolio} />}
      <PortfolioGrid 
        portfolios={portfolios as Portfolio[]} 
        featuredId={featuredPortfolio?.id} 
      />
    </main>
  );
}