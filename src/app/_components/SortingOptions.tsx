// src/app/_components/SortingOptions.tsx
'use client';

import { ChevronDown } from 'lucide-react';

interface SortingOptionsProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortingOptions({ value, onChange }: SortingOptionsProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-4 pr-10 py-2 text-gray-700 dark:text-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="random">Slumpmässig</option>
        <option value="newest">Nyast först</option>
        <option value="oldest">Äldst först</option>
        <option value="nameAZ">Namn (A-Ö)</option>
        <option value="nameZA">Namn (Ö-A)</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}