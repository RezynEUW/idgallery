// src/app/_components/ClassFilter.tsx
'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getUniqueClassYears } from '@/lib/portfolioUtils';
import portfolios from '@/data/portfolios.json';
import { Portfolio } from '@/types/portfolio';

interface ClassFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ClassFilter({ value, onChange }: ClassFilterProps) {
  const [classYears, setClassYears] = useState<string[]>([]);
  
  useEffect(() => {
    const years = getUniqueClassYears(portfolios as Portfolio[]);
    setClassYears(years);
  }, []);
  
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-4 pr-10 py-2 text-gray-700 dark:text-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All Classes</option>
        {classYears.map((year) => (
          <option key={year} value={year}>
            ID{year}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}