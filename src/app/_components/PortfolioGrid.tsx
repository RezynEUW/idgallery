// src/app/_components/PortfolioGrid.tsx
'use client';

import { useState, useEffect } from 'react';
import PortfolioCard from './PortfolioCard';
import ClassFilter from './ClassFilter';
import RoleFilter from './RoleFilter';
import SearchBar from './SearchBar';
import SortingOptions from './SortingOptions';
import { Portfolio } from '@/types/portfolio';

interface PortfolioGridProps {
  portfolios: Portfolio[];
  featuredId?: string;
}

type SortOption = 'random' | 'newest' | 'oldest' | 'nameAZ' | 'nameZA';

// Fisher-Yates shuffle algorithm for random sort
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function PortfolioGrid({ portfolios, featuredId }: PortfolioGridProps) {
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [classFilter, setClassFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('random');
  
  // Apply filters and sorting
  useEffect(() => {
    // Remove the featured portfolio from the grid
    const gridPortfolios = featuredId 
      ? portfolios.filter(p => p.id !== featuredId)
      : portfolios;
    
    let results = gridPortfolios;
    
    // Apply class filter
    if (classFilter !== 'all') {
      results = results.filter(p => p.classYear.toString() === classFilter);
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      results = results.filter(p => p.role === roleFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description?.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'random':
        results = shuffleArray(results);
        break;
      case 'newest':
        results = [...results].sort((a, b) => parseInt(b.classYear) - parseInt(a.classYear));
        break;
      case 'oldest':
        results = [...results].sort((a, b) => parseInt(a.classYear) - parseInt(b.classYear));
        break;
      case 'nameAZ':
        results = [...results].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        results = [...results].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    setFilteredPortfolios(results);
  }, [portfolios, featuredId, classFilter, roleFilter, searchQuery, sortOption]);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Studentportföljer</h2>
      
      {/* Filters and search row */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="flex flex-wrap gap-4">
          <ClassFilter value={classFilter} onChange={setClassFilter} />
          <RoleFilter value={roleFilter} onChange={setRoleFilter} />
          <SortingOptions value={sortOption} onChange={(value) => setSortOption(value as SortOption)} />
        </div>
      </div>
      
      {/* Portfolio grid */}
      {filteredPortfolios.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredPortfolios.map((portfolio, index) => (
            <div key={portfolio.id}>
              <PortfolioCard 
                portfolio={portfolio} 
                index={index} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Inga portföljer hittades som matchar dina kriterier.
          </p>
        </div>
      )}
    </div>
  );
}