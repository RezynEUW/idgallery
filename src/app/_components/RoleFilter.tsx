// src/app/_components/RoleFilter.tsx
'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getUniqueRoles } from '@/lib/portfolioUtils';
import portfolios from '@/data/portfolios.json';
import { Portfolio } from '@/types/portfolio';

interface RoleFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RoleFilter({ value, onChange }: RoleFilterProps) {
  const [roles, setRoles] = useState<string[]>([]);
  
  useEffect(() => {
    const uniqueRoles = getUniqueRoles(portfolios as Portfolio[]);
    setRoles(uniqueRoles);
  }, []);
  
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md pl-4 pr-10 py-2 text-gray-700 dark:text-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">Alla Roller</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}